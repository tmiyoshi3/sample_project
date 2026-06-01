// Generated from: features/F-03/F-03-02-010_spec-tab.feature
import { test } from "playwright-bdd";

test.describe('仕様タブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('仕様データがある製品でキーバリューテーブルが表示される', { tag: ['@F-03-02-010', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「仕様」タブをクリックする', null, { page }); 
    await Then('仕様テーブルに「CPU」の項目が表示されている', null, { page }); 
    await And('仕様テーブルに「メモリ」の項目が表示されている', null, { page }); 
    await And('仕様テーブルに「ストレージ」の項目が表示されている', null, { page }); 
    await And('仕様テーブルに「消費電力」の項目が表示されている', null, { page }); 
  });

  test('仕様データがない製品で空状態メッセージが表示される', { tag: ['@F-03-02-010', '@UC-010', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "50" の製品詳細画面を表示している', null, { page }); 
    await When('「仕様」タブをクリックする', null, { page }); 
    await Then('「仕様情報は登録されていません」メッセージが表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-010_spec-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-010","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 「仕様」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"仕様","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then 仕様テーブルに「CPU」の項目が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"CPU","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 仕様テーブルに「メモリ」の項目が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"メモリ","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 仕様テーブルに「ストレージ」の項目が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"ストレージ","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And 仕様テーブルに「消費電力」の項目が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"消費電力","children":[]}}]}]},
  {"pwTestLine":20,"pickleLine":24,"tags":["@F-03-02-010","@UC-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given 製品ID \"50\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"50\"","children":[{"start":6,"value":"50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When 「仕様」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"仕様","children":[]}}]},{"pwStepLine":23,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then 「仕様情報は登録されていません」メッセージが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end