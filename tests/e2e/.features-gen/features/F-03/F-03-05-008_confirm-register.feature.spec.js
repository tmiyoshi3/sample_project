// Generated from: features/F-03/F-03-05-008_confirm-register.feature
import { test } from "playwright-bdd";

test.describe('確認・登録実行', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('製品登録画面で全ステップの入力が完了している', null, { page }); 
    await And('ステップ5「確認」が表示されている', null, { page }); 
  });
  
  test('確認画面に入力内容が読み取り専用で表示される', { tag: ['@F-03-05-008', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('「入力内容の確認」見出しが表示される', null, { page }); 
    await And('基本情報セクションに製品名が表示される', null, { page }); 
    await And('基本情報セクションにSKUが表示される', null, { page }); 
    await And('基本情報セクションにカテゴリが表示される', null, { page }); 
    await And('基本情報セクションにメーカーが表示される', null, { page }); 
    await And('基本情報セクションにステータスが表示される', null, { page }); 
    await And('価格・在庫セクションに単価が表示される', null, { page }); 
    await And('価格・在庫セクションに単位が表示される', null, { page }); 
    await And('価格・在庫セクションに最低発注数が表示される', null, { page }); 
    await And('価格・在庫セクションにリードタイムが表示される', null, { page }); 
    await And('「登録する」ボタンが表示される', null, { page }); 
  });

  test('登録するボタンをクリックして製品登録が成功する', { tag: ['@F-03-05-008', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('「登録する」ボタンをクリックする', null, { page }); 
    await Then('製品詳細画面が表示される', null, { page }); 
  });

  test('確認画面から前のステップに戻って修正できる', { tag: ['@F-03-05-008', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('「← 前へ」ボタンをクリックする', null, { page }); 
    await Then('ステップ4「画像・資料」が表示される', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-008_confirm-register.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":13,"pickleLine":15,"tags":["@F-03-05-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面で全ステップの入力が完了している","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And ステップ5「確認」が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then 「入力内容の確認」見出しが表示される","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 基本情報セクションに製品名が表示される","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 基本情報セクションにSKUが表示される","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And 基本情報セクションにカテゴリが表示される","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 基本情報セクションにメーカーが表示される","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 基本情報セクションにステータスが表示される","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 価格・在庫セクションに単価が表示される","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And 価格・在庫セクションに単位が表示される","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And 価格・在庫セクションに最低発注数が表示される","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And 価格・在庫セクションにリードタイムが表示される","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And 「登録する」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":29,"tags":["@F-03-05-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面で全ステップの入力が完了している","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And ステップ5「確認」が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When 「登録する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then 製品詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":34,"tags":["@F-03-05-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面で全ステップの入力が完了している","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And ステップ5「確認」が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When 「← 前へ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then ステップ4「画像・資料」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"4","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"画像・資料","children":[]}}]}]},
]; // bdd-data-end