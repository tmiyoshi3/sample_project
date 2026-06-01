// Generated from: features/F-03/F-03-03-003_collapse.feature
import { test } from "playwright-bdd";

test.describe('カテゴリ折りたたみ', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('カテゴリ管理画面を表示する', null, { page }); 
  });
  
  test('展開状態のカテゴリを折りたたむと子カテゴリが非表示になる', { tag: ['@F-03-03-003', '@UC-012', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「コンピュータ」の折りたたみアイコンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが非表示になっている', null, { page }); 
    await And('「コンピュータ」に折りたたみアイコン（▶）が表示されている', null, { page }); 
  });

  test('折りたたみ状態のカテゴリを展開すると子カテゴリが表示される', { tag: ['@F-03-03-003', '@UC-012', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('「コンピュータ」を折りたたんでいる', null, { page }); 
    await When('「コンピュータ」の展開アイコンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが表示されている', null, { page }); 
    await And('「コンピュータ」に展開アイコン（▼）が表示されている', null, { page }); 
  });

  test('複数のカテゴリを個別に折りたためる', { tag: ['@F-03-03-003', '@UC-012', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「コンピュータ」の折りたたみアイコンをクリックする', null, { page }); 
    await And('「周辺機器」の折りたたみアイコンをクリックする', null, { page }); 
    await Then('「コンピュータ」の子カテゴリが非表示になっている', null, { page }); 
    await And('「周辺機器」の子カテゴリが非表示になっている', null, { page }); 
    await And('「ネットワーク」の子カテゴリが表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-03-003_collapse.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-03-003","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」の折りたたみアイコンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが非表示になっている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 「コンピュータ」に折りたたみアイコン（▶）が表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]}]},
  {"pwTestLine":18,"pickleLine":21,"tags":["@F-03-03-003","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given 「コンピュータ」を折りたたんでいる","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」の展開アイコンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And 「コンピュータ」に展開アイコン（▼）が表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]}]},
  {"pwTestLine":25,"pickleLine":28,"tags":["@F-03-03-003","@UC-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」の折りたたみアイコンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And 「周辺機器」の折りたたみアイコンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"周辺機器","children":[]}}]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then 「コンピュータ」の子カテゴリが非表示になっている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And 「周辺機器」の子カテゴリが非表示になっている","stepMatchArguments":[{"group":{"start":1,"value":"周辺機器","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And 「ネットワーク」の子カテゴリが表示されている","stepMatchArguments":[{"group":{"start":1,"value":"ネットワーク","children":[]}}]}]},
]; // bdd-data-end