// 所有个性化内容从这里修改；占位答案可直接试玩。
window.BIRTHDAY_CONFIG = {
  version: 'demo-1', // 修改题目后更新版本号，清除旧进度
  recipient: '【寿星名字】', sender: '【你的名字】',
  intro: '有些心意，想慢慢说给你听。四封藏着回忆的信，和一份只属于你的生日惊喜，正在等你。',
  music: '', // 例如 assets/music.mp3；为空时按钮会说明未配置
  levels: [
    { title: '故事，从那一天开始', label: '一段共同的回忆', type: 'text',
      question: '【记忆题占位】我们第一次见面的月份和日期是？', detail: '把那个特别的日子，写成四位数字。', placeholder: '输入四位日期，如 0601', answers: ['0601'], hint: '试玩答案：0601。之后换成你们真实的纪念日。' },
    { title: '把日常，拼成线索', label: '三张照片的小秘密', type: 'images',
      question: '按照片从左到右的顺序，找到画面里的数字。', detail: '把三个数字连在一起，就是下一封信的钥匙。', placeholder: '输入三个数字', answers: ['317'], hint: '看看图片右上角，试玩答案是 317。',
      images: [{ src: 'assets/clue-1.svg', caption: '01 / 午后的窗边', alt: '照片线索占位一，右上角数字3' }, { src: 'assets/clue-2.svg', caption: '02 / 路上的风景', alt: '照片线索占位二，右上角数字1' }, { src: 'assets/clue-3.svg', caption: '03 / 那一束花', alt: '照片线索占位三，右上角数字7' }] },
    { title: '一句藏起来的祝愿', label: '解开字母的悄悄话', type: 'text',
      question: '信纸上写着：IBQQZ', detail: '每个英文字母向前退一位：B → A，C → B。它原本是什么单词？', placeholder: '输入解开的英文单词', answers: ['HAPPY'], hint: 'I → H，B → A。试玩答案：HAPPY，大小写都可以。' },
    { title: '最后，把答案交给心', label: '一个不用犹豫的选择', type: 'choice',
      question: '【选择题占位】新的一岁，我最想对你说的是？', detail: '只有一个选项，装得下所有祝愿。',
      options: ['愿你睡得香，吃得好', '愿你勇敢，也被温柔以待', '愿你一直做喜欢的自己', '以上全部，都是我的心愿'], correctIndex: 3, hint: '不用取舍，把所有美好都选上。' }
  ],
  letter: ['亲爱的【寿星名字】：', '生日快乐。谢谢你出现在我的生活里，让许多平凡的日子，都有了值得收藏的光。', '【在这里换成你们的故事：一次旅行、一句玩笑，或一个一直记得的小瞬间。】', '新的一岁，愿你有探索世界的勇气，也有安心做自己的底气。愿你的快乐具体，愿你的烦恼短暂，愿你被爱，也自由。', '接下来的故事，我们慢慢写。'],
  photos: [{ src: 'assets/memory-1.svg', caption: '【照片占位】一起走过的地方' }, { src: 'assets/memory-2.svg', caption: '【照片占位】普通却闪光的一天' }, { src: 'assets/memory-3.svg', caption: '【照片占位】下次还要一起' }]
};
