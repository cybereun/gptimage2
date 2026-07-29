const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'GPT-Image2', 'src', 'data', 'initialPrompts.json');
let prompts = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));

let restoredCount = 0;

prompts = prompts.map(item => {
  if (item.category === '⚠️ 이미지 없음 (작업용)' && item.originalCategory) {
    restoredCount++;
    return {
      ...item,
      category: item.originalCategory,
      categoryGroup: item.categoryGroup || '기타'
    };
  }
  return item;
});

console.log(`Successfully restored ${restoredCount} prompts back to their original categories!`);
fs.writeFileSync(targetFile, JSON.stringify(prompts, null, 2), 'utf-8');
