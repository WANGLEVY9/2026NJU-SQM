#!/usr/bin/env python3
"""
从HTML课件提取文本内容转换为Markdown
支持章节识别、列表提取、代码块等
"""

import os
import re
from pathlib import Path

def clean_html_content(html_content):
    """清理HTML内容，提取文本并转换为Markdown格式"""
    
    # 移除script和style标签内容
    html_content = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<style[^>]*>.*?</style>', '', html_content, flags=re.DOTALL)
    
    # 提取title
    title_match = re.search(r'<title>([^<]+)</title>', html_content)
    title = title_match.group(1) if title_match else ""
    
    # 处理section标签 - 作为新章节
    html_content = re.sub(r'<section[^>]*class="slide[^"]*chapter[^"]*"[^>]*>', 
                          r'\n\n## 章节: ', html_content)
    html_content = re.sub(r'<section[^>]*class="slide content[^"]*"[^>]*>', 
                          r'\n\n### ', html_content)
    html_content = re.sub(r'<section[^>]*>', '\n\n', html_content)
    html_content = re.sub(r'</section>', '\n', html_content)
    
    # 处理标题标签
    html_content = re.sub(r'<h1[^>]*>(.*?)</h1>', r'\n# \1\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<h2[^>]*>(.*?)</h2>', r'\n## \1\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<h3[^>]*>(.*?)</h3>', r'\n### \1\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<h4[^>]*>(.*?)</h4>', r'\n#### \1\n', html_content, flags=re.DOTALL)
    
    # 处理列表
    html_content = re.sub(r'<ul[^>]*>', '\n', html_content)
    html_content = re.sub(r'</ul>', '\n', html_content)
    html_content = re.sub(r'<ol[^>]*>', '\n', html_content)
    html_content = re.sub(r'</ol>', '\n', html_content)
    html_content = re.sub(r'<li[^>]*>(.*?)</li>', r'\n- \1', html_content, flags=re.DOTALL)
    
    # 处理代码块
    html_content = re.sub(r'<code[^>]*>(.*?)</code>', r'`\1`', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<pre[^>]*>(.*?)</pre>', r'\n```\n\1\n```\n', html_content, flags=re.DOTALL)
    
    # 处理加粗和斜体
    html_content = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', html_content, flags=re.DOTALL)
    
    # 处理 span 和 div 中的文本（保留关键class信息）
    html_content = re.sub(r'<span[^>]*class="[^"]*s-eyebrow[^"]*"[^>]*>(.*?)</span>', 
                          r'\n**\1**\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<span[^>]*class="[^"]*step-content[^"]*"[^>]*>(.*?)</span>', 
                          r'\n\1', html_content, flags=re.DOTALL)
    
    # 处理class名称中的标签
    html_content = re.sub(r'<div[^>]*class="[^"]*s-lead[^"]*"[^>]*>(.*?)</div>', 
                          r'\n> \1\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<div[^>]*class="[^"]*step-num[^"]*"[^>]*>(.*?)</div>', 
                          r'\n**[\1]** ', html_content, flags=re.DOTALL)
    
    # 处理 ladder-step 类的div
    html_content = re.sub(r'<div[^>]*class="[^"]*ladder-step[^"]*"[^>]*>(.*?)</div>', 
                          r'\n- \1', html_content, flags=re.DOTALL)
    
    # 处理表格
    html_content = re.sub(r'<table[^>]*>', '\n\n| ', html_content)
    html_content = re.sub(r'<tr[^>]*>', '| ', html_content)
    html_content = re.sub(r'</tr>', '\n', html_content)
    html_content = re.sub(r'<th[^>]*>(.*?)</th>', r'| **\1** ', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<td[^>]*>(.*?)</td>', r'| \1 ', html_content, flags=re.DOTALL)
    html_content = re.sub(r'</table>', '\n\n', html_content)
    
    # 移除剩余的HTML标签
    html_content = re.sub(r'<br\s*/?> ', '\n', html_content)
    html_content = re.sub(r'<[^>]+>', '', html_content)
    
    # 清理实体编码
    html_content = html_content.replace('&nbsp;', ' ')
    html_content = html_content.replace('&lt;', '<')
    html_content = html_content.replace('&gt;', '>')
    html_content = html_content.replace('&amp;', '&')
    html_content = html_content.replace('&quot;', '"')
    html_content = html_content.replace('&#39;', "'")
    
    # 清理多余空行
    lines = html_content.split('\n')
    cleaned_lines = []
    prev_empty = False
    for line in lines:
        line = line.strip()
        if not line:
            if not prev_empty:
                cleaned_lines.append('')
            prev_empty = True
        else:
            cleaned_lines.append(line)
            prev_empty = False
    
    result = '\n'.join(cleaned_lines)
    
    # 清理连续的空行
    result = re.sub(r'\n{3,}', '\n\n', result)
    
    return title, result

def extract_section_content(html_content, section_class):
    """提取特定class的section内容"""
    pattern = rf'<section[^>]*class="[^"]*{section_class}[^"]*"[^>]*>(.*?)</section>'
    matches = re.findall(pattern, html_content, re.DOTALL)
    return matches

def process_html_file(html_path):
    """处理单个HTML文件"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        title, markdown_content = clean_html_content(content)
        
        return {
            'title': title,
            'content': markdown_content,
            'success': True
        }
    except Exception as e:
        return {
            'title': '',
            'content': '',
            'error': str(e),
            'success': False
        }

def main():
    base_dir = Path(r"e:\Codes\2026\2026-SQM")
    output_dir = base_dir / "extracted_content"
    output_dir.mkdir(exist_ok=True)
    
    # 创建markdown输出目录
    md_output_dir = output_dir / "markdown"
    md_output_dir.mkdir(exist_ok=True)
    
    print("=" * 60)
    print("HTML课件内容提取工具")
    print("=" * 60)
    
    # 处理HTML课件目录
    html_dirs = [
        base_dir / "课件" / "XP",
    ]
    
    all_extracted = {}
    
    for html_dir in html_dirs:
        if html_dir.exists():
            print(f"\n处理目录: {html_dir.name}")
            for html_file in html_dir.glob("*.html"):
                print(f"  读取: {html_file.name}", end=" ... ")
                result = process_html_file(html_file)
                
                if result['success']:
                    # 保存为markdown文件
                    md_file = md_output_dir / f"{html_file.stem}.md"
                    with open(md_file, 'w', encoding='utf-8') as f:
                        f.write(f"# {result['title']}\n\n")
                        f.write(result['content'])
                    
                    all_extracted[html_file.name] = result['content']
                    print(f"[OK] {md_file.name}")
                else:
                    print(f"[FAIL] {result.get('error', 'Unknown error')}")
    
    # 生成汇总文件
    summary_file = output_dir / "XP课程内容汇总.md"
    with open(summary_file, 'w', encoding='utf-8') as f:
        f.write("# XP（极限编程）课程内容汇总\n\n")
        f.write("> 本内容由extract_html.py自动从HTML课件提取\n\n")
        f.write("---\n\n")
        
        for filename, content in sorted(all_extracted.items()):
            f.write(f"\n\n# {filename}\n\n")
            f.write(content)
    
    print("\n" + "=" * 60)
    print("提取完成!")
    print(f"Markdown文件保存在: {md_output_dir}")
    print(f"汇总文件: {summary_file.name}")
    print("=" * 60)

if __name__ == "__main__":
    main()
