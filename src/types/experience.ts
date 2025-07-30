export interface Experience {
  id: string;
  catchCopy: string;
  summary: string;
  mainCategory: string;
  subCategory: string;
  smallTags: string[];
  emotionTags: string[];
  contextTags: string[];
  content: string;
  likes: number;
  isLiked: boolean;
}

export interface Category {
  name: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    name: "進路・学び",
    subcategories: ["大学受験", "高校受験", "進学後の後悔・正解", "留学・ギャップイヤー", "第二の学び直し"]
  },
  {
    name: "就活・転職",
    subcategories: ["初めての就活・内定", "ブラック企業からの脱出", "会社選びの失敗と学び", "キャリアの軸探し", "フリーランス・独立への一歩"]
  },
  {
    name: "働き方・キャリア形成",
    subcategories: ["会社での人間関係", "モチベーションの上下", "昇進・異動・退職の決断", "やりがい・意義の再定義", "自己分析・キャリア迷子"]
  },
  {
    name: "恋愛・結婚・パートナーシップ",
    subcategories: ["初恋・別れ・恋愛観の変化", "同棲・結婚のリアル", "価値観のすり合わせ", "離婚・婚約破棄", "子育てとの両立"]
  },
  {
    name: "お金・暮らし・自立",
    subcategories: ["一人暮らしの壁", "お金が尽きた話", "奨学金・貯金・家計管理", "年収変動と生活", "暮らしの価値観アップデート"]
  },
  {
    name: "心と身体",
    subcategories: ["燃え尽き・うつ・不登校", "認知の歪み・HSP・グレーゾーン", "自己肯定感と承認欲求", "健康・美容の悩み", "カウンセリング・薬との付き合い"]
  },
  {
    name: "夢・価値観・人生観",
    subcategories: ["夢が変わった瞬間", "才能・強みが分からない", "SNS疲れと比較", "好きなことで生きていく幻想", "自分に合う場所に出会うまで"]
  }
];