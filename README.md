# ChatIE

**NOTE: It's a rebuilt version of [ChatIE](https://github.com/cocacola-lab/ChatIE) project from cocacola-lab BJTU**

> _[GPT4IE](https://github.com/lavanceeee/GPT4IE) is a clean version of ChatIE, which integrates two-stage framework into a unified system and using only one set of prompt. The result are equally execellent!_

## What I have done

- [x] Essential Code Refactoring & Optimization

- [ ] Benchmarking based on different LLMs

- [ ] Richer Core functions(resust visualization, saving, tec...) 

I rebuilt the entire project using JavaScript, making it cleaner and purer: abandoned Flask and integrated each processing into frontend.

I restructured all processing logic in a more systematic and engineering-oriented way: I identified numerous "unreasonable" varable and overly complex processing logic, which made the entire project "bloated". By applying layered processing and logical decouping, I reduced complexity and made the project easier to understand.

## What I have learned 🤜

Zero-shot Information Extraction attempts to extract structured information using LLMs also prompt engineering. By leveraging modern LLM APIs, such as ChatGPT, DeepSeek, structured information extraction has been successfully achieved through prompt-driven, multi-turn conversations.

[![processing](/public/README/processing.png)](https://github.com/cocacola-lab/ChatIE?tab=readme-ov-file#methods)

Test results vary across different LLM models also different processing model between ChatIE and GPT4IE: I used `doubao-lite-32k-240828` and `deepseek-r1-250528`for testing, the results indicate that lightweight models(e.g., `doubao-lite-32k-240828`) are better suited for integrated IE tasks(GPT4IE), while models with a higher parameter couts(e.g., `deepseek-r1-250528`) excel in complex, two-stage framework(ChatIE).

## Benchmark

**The complete test result is on the folder `/test`.** 

Results indicate that LLMs with larger parameters counts achieve better performance, with more stable and comprehensive outputs.

### RE

sentence:

+ 上海迪士尼乐园是一座主题乐园，位于上海市浦东新区，由华特迪士尼公司和上海申迪集团联合运营。

pattern: 

+ {"rtl": ["位于", "联合运营"], "stl": ["娱乐场所"], "otl": ["地理位置", "运营企业"]}

result:

![result](./test/doubao-lite-32k-240828/RE/ch/t03-ch.png)

sentence:

+ Tesla Model 3 is an electric car, manufactured by Tesla, Inc., equipped with autopilot technology.

pattern:

+ {"rtl": ["manufactured by", "equipped with"], "stl": ["vehicle"], "otl": ["company", "technology"]}

![result](./test/doubao-lite-32k-240828/RE/en/t03.png)

### EE

sentence:
+ 2024 年 3 月，字节跳动与清华大学人工智能研究院达成战略合作，共同研发基于多模态大模型的智能教育系统，项目首期投入超 5 亿元，预计 2026 年完成核心技术突破并应用于 K12 教育场景。

pattern: 
+  {
"etl": {
"企业合作 - 技术研发": [
"2024 年 3 月",
"字节跳动、清华大学人工智能研究院",
"多模态大模型的智能教育系统",
"超 5 亿元",
"2026 年",
"K12 教育场景"
]
}
}

result:

![result](./test/deepseek-r1/EE/ch/t01.png)
### NER

sentence:

+ 珠穆朗玛峰位于中国和尼泊尔边境，是世界最高峰。

pattern：

+ {"etl": ["山峰名", "国家名", "国家名", "地理称谓"]}

result：

![result](./test/doubao-lite-32k-240828/NER/ch/t05.png)

sentence:
+ iPhone 15, designed by Apple, was released in September 2023.

pattern:

+ {"etl": ["PROD", "ORG", "DATE", "DATE"]}

![result](./test/doubao-lite-32k-240828/NER/en/t03.png)












