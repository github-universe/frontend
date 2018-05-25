import ipDetail from './ipDetail'

const openId = localStorage.getItem('openId')

export default {
  ipList: [
    { id: 1 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
  ],
  errorMsg: '',
  showLoading: 1,
  news: {
    content: "虽然说 PSVita 在整个生命周期中都未能取得好的销售成绩，实体卡带也将在 2019 年停产，但显然 Sony 对手持式游戏机的计划并未到此终结。Sony 游戏部门老大小寺刚向 Bloomberg 表示，「与其将手持游戏与主机游戏分离开来，我们必须将手持游戏视为游戏整体体验的一部份，并且探索客户想从手持游戏中获得什么。」  听起来，Sony 不仅没有要放弃手持游戏机的意思，而且似乎还希望与主机进行某种方式的连动。究竟是像 Switch 一样，直接让手持机身主机？又或是在控制器上做文章？甚至是将手机再重新拉进来？这就要看 Sony 接下来准备怎么发展了。只是 Switch 已经算是在当前技术下，携带性和性能较佳的平衡了，如果 Sony 想要依法炮制，甚至维持现有的画质优势的话，恐怕还要硬件技术再有突破才行。  总之，PSP 到 PSV 之间过了六年的时间，而 PSV 到现在也差不多六年多，确实是到了 Sony 下定决心的时候了。一般游戏主机的生命周期大约是 10 年左右，也就是说 2021 年前后就到了 PSV 该停产的时候，如果 Sony 的计划是要和 PS5 连动的话，应该不久就会开始听到相关的消息了吧？",
    created: "2018-05-25 08:42",
    id: 1,
    keywords: ["索尼", "游戏机"],
    title: "索尼还没准备放弃手持式游戏机",
  },
  openId,
  ipDetail: ipDetail[3],
  citationDetail: [{
    // 专利引用个数
    "patent_id": "00000000-0000-0000-0000-000000000000",
    "count": 10
  }],
  ipValueDetail: [
    // 专利价值详情
    {
      "patent_id": "00000000-0000-0000-0000-000000000000",
      "legal": 0,
      "assignee": 0,
      "market_attractiveness": 0,
      "market_coverage": 0,
      "technology": 0,
      "patent_value": 0
    }
  ],
  ipSearch: {
    // 专利检索
    "patent_id": [
      "00000000-0000-0000-0000-000000000000",
      "11111111-1111-1111-1111-111111111111"
    ],
    "offset": 0,
    "limit": 10,
    "total": 100
  },
  ipClassification: [
    // 专利分类号详情
    {
      "ipc": "A01",
      "version": "2016.01",
      "desc": [
        {
          "text": "AGRICULTURE; FORESTRY; ANIMAL HUSBANDRY; HUNTING; TRAPPING; FISHING",
          "lang": "EN"
        }
      ],
      "parent": [
        {
          "ipc": "A",
          "version": "2016.01",
          "desc": [
            {
              "text": "HUMAN NECESSITIES",
              "lang": "EN"
            }
          ]
        }
      ]
    }
  ],
  cname_parser_cn: {
    // COMPANY NAME PARSER CN
    // 用于将中文公司名分解成其前缀与后缀，以此找到公司专有名称（corename）和行业分类的分界
    "data": {
      "prefix": "\u6e29\u5dde\u5eb7\u8363",
      "suffix": "\u670d\u9970\u6709\u9650\u516c\u53f8"
    },
    "error_code": 0,
    "error_message": "ok"
  },
  ner_news_cn: {
    // 中文新闻文章的实体识别API
    // 实体类别:
    // • PPL -- 人名
    // • ORG -- 包括公司，学术机构，政府机构及其他组织
    // • LOC -- 地理位置
    "data": [
      {
        "end": -1,
        "entity": "\u6768\u5fb7\u57ce.",
        "ner_type": "PPL",
        "start": -1
      }
    ],
    "error_code": 0,
    "error_message": "ok"
  },
  kwd_helper_cn: {
    // 提供了对用户搜索的word或者phrase找出和它们相似的word或者phras
    "data": [
      {
        "keyword": "\u56fe\u7247",
        "score": 0.76675445
      },
      {
        "keyword": "\u5904\u7406",
        "score": 0.7667544
      },
      {
        "keyword": "\u7cbe\u7075\u5316",
        "score": 0.7460406
      },
      {
        "keyword": "\u6392\u5e8f\u5316",
        "score": 0.74593174
      },
      {
        "keyword": "\u5f3a\u9c81\u68d2",
        "score": 0.7385903
      },
      {
        "keyword": "\u4e71\u5e8f\u5316",
        "score": 0.7359603
      },
      {
        "keyword": "\u9884\u8f6c\u7801",
        "score": 0.7336041
      },
      {
        "keyword": "\u505a\u91cf\u5316",
        "score": 0.7308644
      },
      {
        "keyword": "\u7406\u5c04\u9891",
        "score": 0.7276241
      },
      {
        "keyword": "\u9690\u79c1\u5316",
        "score": 0.7267561
      }
    ],
    "error_code": 0,
    "error_message": "ok"
  },
  // newsList: [],
  newsList: [{
    id: 1,
    title: '1111111111111索尼还没有11111111111111111索尼还没有11111111111111111索尼还没有1111。。。。',
    content: '虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机'],
    imgs: ['https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026'],
  }, {
    id: 2,
    title: '索尼公司公布了新任总裁兼CEO吉田宪一郎统治下的未来三年的公司战略索尼公司公布了新任总裁兼CEO吉田宪一郎统治下的未来三年的公司战略',
    content: '5月22日，索尼公司公布了新任总裁兼CEO吉田宪一郎统治下的未来三年的公司战略。在2017财年利润重回历史顶点之后，索尼大法将如何继续发功，四大支柱性业务此时横空出世！  一、在多业务类别中加大内容IP打造力度。  索尼在战略发布的首要位置明确提出未来要加强直接面向消费者的服务和内容IP，将追求共同情感价值和体验的人们聚集在一起。包括音乐、影视和游戏在内的综合娱乐业务均将基本策略定为"加强利用内容IP"。同期的三大未来投资方向，"内容IP" 身居要位。  在音乐业务中，为了最大限度地利用流媒体市场持续增长带来的商机，索尼将努力加强其内容IP的质量和数量，同时发现并培育新艺术家以创造新IP。就在企业战略发布当天，一笔阔气的音乐版权公司股权交易也应声落地。索尼重磅宣布将以23亿美元收购穆巴达拉财团持有的百代音乐出版公司（EMI Music Publishing）约60％ 的股权。交易结束后，索尼将间接拥有百代约90％的股权。加上索尼ATV，索尼将成为全球最大的音乐发行公司。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机', '游戏机', '游戏机', '游戏机', '游戏机', '游戏机', '游戏机'],
  }, {
    id: 3,
    title: '3333333索尼还没有。。。。',
    content: '虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机'],
    imgs: ['https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026', 'https://p3.pstatp.com/list/190x124/85f9001bed454a5776fa', 'https://p9.pstatp.com/list/190x124/pgc-image/1526863756787eb9f07b23a'],
  }, {
    id: 4,
    title: '44444444索尼还没有。。。。',
    content: '虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机'],
    imgs: ['https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026'],
  }, {
    id: 5,
    title: '44444444索尼还没有。。。。',
    content: '虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机'],
    imgs: ['https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026'],
  }, {
    id: 6,
    title: '44444444索尼还没有。。。。',
    content: '虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机'],
    imgs: ['https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026'],
  }, {
    id: 7,
    title: '44444444索尼还没有。。。。',
    content: '虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。虽然。。。。',
    created: '2018-05-25 08:42',
    keywords: ['索尼', '游戏机'],
    imgs: ['https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026'],
  }]
}