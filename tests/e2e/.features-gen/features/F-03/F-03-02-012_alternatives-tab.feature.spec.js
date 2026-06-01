// Generated from: features/F-03/F-03-02-012_alternatives-tab.feature
import { test } from "playwright-bdd";

test.describe('代替品タブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('代替品データがある製品でテーブルが表示される', { tag: ['@F-03-02-012', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「代替品」タブをクリックする', null, { page }); 
    await Then('代替品テーブルが表示されている', null, { page }); 
    await And('代替品テーブルに「SKU」列が表示されている', null, { page }); 
    await And('代替品テーブルに「製品名」列が表示されている', null, { page }); 
    await And('代替品テーブルに「メーカー」列が表示されている', null, { page }); 
    await And('代替品テーブルに「単価」列が表示されている', null, { page }); 
    await And('代替品テーブルに「ステータス」列が表示されている', null, { page }); 
    await And('代替品テーブルに1件以上の代替品が表示されている', null, { page }); 
  });

  test('代替品の「詳細」ボタンクリックで代替製品の詳細画面に遷移する', { tag: ['@F-03-02-012', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「代替品」タブをクリックする', null, { page }); 
    await And('代替品の「詳細」ボタンをクリックする', null, { page }); 
    await Then('代替製品の製品詳細画面が表示されている', null, { page }); 
  });

  test.skip('代替品データがない製品で空状態メッセージが表示される', { tag: ['@F-03-02-012', '@UC-010', '@データ状態', '@skip'] }, async ({ Given, When, Then }) => { 
    await Given('製品ID "50" の製品詳細画面を表示している'); 
    await When('「代替品」タブをクリックする'); 
    await Then('「代替品は登録されていません」メッセージが表示されている'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-012_alternatives-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":14,"tags":["@F-03-02-012","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When 「代替品」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"代替品","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then 代替品テーブルが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 代替品テーブルに「SKU」列が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"SKU","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And 代替品テーブルに「製品名」列が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"製品名","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 代替品テーブルに「メーカー」列が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"メーカー","children":[]}}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 代替品テーブルに「単価」列が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"単価","children":[]}}]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 代替品テーブルに「ステータス」列が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"ステータス","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And 代替品テーブルに1件以上の代替品が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":26,"tags":["@F-03-02-012","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When 「代替品」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"代替品","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 代替品の「詳細」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then 代替製品の製品詳細画面が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":35,"skipped":true,"tags":["@F-03-02-012","@UC-010","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":31,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given 製品ID \"50\" の製品詳細画面を表示している"},{"pwStepLine":32,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When 「代替品」タブをクリックする"},{"pwStepLine":33,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then 「代替品は登録されていません」メッセージが表示されている"}]},
]; // bdd-data-end