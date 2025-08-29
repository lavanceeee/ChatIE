import storeData from "../store";

export function getRandomColor() {
  const randomColor = [
    "#637DBB",
    "#B37DBB",
    "#B3ABBB",
    "#B3ABA2",
    "#32ABA2",
    "#96ABA2",
    "#CDD66F",
    "#5f59657a",
  ];

  const max = randomColor.length;

  return randomColor[Math.floor(Math.random() * max)];
}

/*
transform md table to object

| stl| otl | reaction |
|--------|------|----------|
| 张三   | 朋友 | 李四     |
| 李四   | 同事 | 王五     |
*/

export function mdConverter(markdown) {
  const model = storeData.getModel();

  switch (model) {
    case "RE":
      return convertRE(markdown);
    case "NER":
      return convertNERorEE(markdown);
    case "EE":
      return convertNERorEE(markdown);
  }
}

function convertRE(markdown) {
  const lines = markdown.split("\n").filter((line) => line.trim() !== "");
  if (lines.length < 2) {
    return { stl: [], otl: [], relation: [] };
  }

  const stl = [];
  const otl = [];
  const relation = [];

  for (let i = 2; i < lines.length; i++) {
    const row = lines[i]
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell !== "");

    stl.push(row[0]);
    otl.push(row[1]);
    relation.push(row[2]);
  }

  return { stl, otl, relation };
}

function convertNERorEE(markdown) {
  const lines = markdown.split("\n").filter((line) => line.trim() !== "");

  if (lines.length < 2) return {};

  const result = [];

  for (let i = 2; i < lines.length; i++) {
    const row = lines[i]
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell !== "");

    result.push(`${row[0]}：${row[1]}`);
  }

  return { result };
}

// const md = `| stl     | otl   | reaction |
// |---------|-------|----------|
// | 《如懿传》 | 汪俊   | 导演      |
// | 《如懿传》 | 周迅   | 主演      |
// | 《如懿传》 | 霍建华  | 主演      |
// | 《如懿传》 | 张钧甯  | 主演      |
// | 《如懿传》 | 董洁   | 主演      |
// | 《如懿传》 | 辛芷蕾  | 主演      |
// | 《如懿传》 | 童瑶   | 主演      |
// | 《如懿传》 | 李纯   | 主演      |
// | 《如懿传》 | 邬君梅  | 主演      |`;

// const rows = NER2Object(md);

// console.log(rows);
