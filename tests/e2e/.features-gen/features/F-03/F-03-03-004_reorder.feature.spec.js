// Generated from: features/F-03/F-03-03-004_reorder.feature
import { test } from "playwright-bdd";

test.describe('カテゴリ上下移動', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('カテゴリ管理画面を表示する', null, { page }); 
  });
  
  test('カテゴリを上へ移動できる', { tag: ['@F-03-03-004', '@UC-013', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
    await When('「ノートPC」の「上へ移動」ボタンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが「ノートPC」「デスクトップPC」「ワークステーション」の順で表示されている', null, { page }); 
  });

  test('カテゴリを下へ移動できる', { tag: ['@F-03-03-004', '@UC-013', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
    await When('「デスクトップPC」の「下へ移動」ボタンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが「ノートPC」「デスクトップPC」「ワークステーション」の順で表示されている', null, { page }); 
  });

  test('先頭カテゴリの上へ移動は何も起きない', { tag: ['@F-03-03-004', '@UC-013', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
    await When('「デスクトップPC」の「上へ移動」ボタンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
  });

  test('末尾カテゴリの下へ移動は何も起きない', { tag: ['@F-03-03-004', '@UC-013', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
    await When('「ワークステーション」の「下へ移動」ボタンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
  });

  test('並べ替え結果はページリロードで元に戻る', { tag: ['@F-03-03-004', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「ノートPC」の「上へ移動」ボタンをクリックする', null, { page }); 
    await And('カテゴリ管理画面をリロードする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-03-004_reorder.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-03-004","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When 「ノートPC」の「上へ移動」ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"ノートPC","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが「ノートPC」「デスクトップPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"ノートPC","children":[]}},{"group":{"start":23,"value":"デスクトップPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]}]},
  {"pwTestLine":18,"pickleLine":21,"tags":["@F-03-03-004","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When 「デスクトップPC」の「下へ移動」ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"デスクトップPC","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが「ノートPC」「デスクトップPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"ノートPC","children":[]}},{"group":{"start":23,"value":"デスクトップPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]}]},
  {"pwTestLine":24,"pickleLine":27,"tags":["@F-03-03-004","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When 「デスクトップPC」の「上へ移動」ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"デスクトップPC","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]}]},
  {"pwTestLine":30,"pickleLine":33,"tags":["@F-03-03-004","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Given 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When 「ワークステーション」の「下へ移動」ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"ワークステーション","children":[]}}]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]}]},
  {"pwTestLine":36,"pickleLine":39,"tags":["@F-03-03-004","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When 「ノートPC」の「上へ移動」ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"ノートPC","children":[]}}]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"And カテゴリ管理画面をリロードする","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが「デスクトップPC」「ノートPC」「ワークステーション」の順で表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":16,"value":"デスクトップPC","children":[]}},{"group":{"start":26,"value":"ノートPC","children":[]}},{"group":{"start":33,"value":"ワークステーション","children":[]}}]}]},
]; // bdd-data-end