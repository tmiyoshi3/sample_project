// Generated from: features/F-03/F-03-02-011_image-tab.feature
import { test } from "playwright-bdd";

test.describe('画像タブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('画像がある製品でグリッド表示とメインバッジが表示される', { tag: ['@F-03-02-011', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「画像」タブをクリックする', null, { page }); 
    await Then('製品画像が表示されている', null, { page }); 
    await And('「メイン」バッジが表示されている', null, { page }); 
  });

  test('画像がない製品でフォールバック画像が表示される', { tag: ['@F-03-02-011', '@UC-010', '@データ状態'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "50" の製品詳細画面を表示している', null, { page }); 
    await When('「画像」タブをクリックする', null, { page }); 
    await Then('フォールバック画像カードが表示されている', null, { page }); 
    await And('画像のaltテキストに「画像なし」が含まれている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-011_image-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-011","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 「画像」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"画像","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then 製品画像が表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 「メイン」バッジが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":24,"tags":["@F-03-02-011","@UC-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given 製品ID \"50\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"50\"","children":[{"start":6,"value":"50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When 「画像」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"画像","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then フォールバック画像カードが表示されている","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And 画像のaltテキストに「画像なし」が含まれている","stepMatchArguments":[]}]},
]; // bdd-data-end