// Generated from: features/F-03/F-03-02-013_supplier-tab.feature
import { test } from "playwright-bdd";

test.describe('サプライヤータブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test.skip('サプライヤーが登録されている製品でテーブルが表示される', { tag: ['@F-03-02-013', '@UC-010', '@正常系', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('製品ID "7" の製品詳細画面を表示している'); 
    await When('「サプライヤー」タブをクリックする'); 
    await Then('サプライヤーテーブルに「サプライヤー名」列が表示されている'); 
    await And('サプライヤーテーブルに「SKU」列が表示されている'); 
    await And('サプライヤーテーブルに「単価」列が表示されている'); 
    await And('サプライヤーテーブルに「リードタイム」列が表示されている'); 
    await And('サプライヤーテーブルに1件以上のサプライヤーが表示されている'); 
  });

  test.skip('サプライヤーの「詳細」ボタンクリックでサプライヤー詳細画面に遷移する', { tag: ['@F-03-02-013', '@UC-010', '@正常系', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('製品ID "7" の製品詳細画面を表示している'); 
    await And('「サプライヤー」タブをクリックしている'); 
    await When('サプライヤーの「詳細」ボタンをクリックする'); 
    await Then('サプライヤー詳細画面が表示されている'); 
  });

  test('サプライヤー未登録の製品で空状態メッセージが表示される', { tag: ['@F-03-02-013', '@UC-010', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "5" の製品詳細画面を表示している', null, { page }); 
    await When('「サプライヤー」タブをクリックする', null, { page }); 
    await Then('「サプライヤー情報は登録されていません」メッセージが表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-013_supplier-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"skipped":true,"tags":["@F-03-02-013","@UC-010","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":12,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given 製品ID \"7\" の製品詳細画面を表示している"},{"pwStepLine":13,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When 「サプライヤー」タブをクリックする"},{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに「サプライヤー名」列が表示されている"},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに「SKU」列が表示されている"},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに「単価」列が表示されている"},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに「リードタイム」列が表示されている"},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに1件以上のサプライヤーが表示されている"}]},
  {"pwTestLine":21,"pickleLine":26,"skipped":true,"tags":["@F-03-02-013","@UC-010","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":22,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given 製品ID \"7\" の製品詳細画面を表示している"},{"pwStepLine":23,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"And 「サプライヤー」タブをクリックしている"},{"pwStepLine":24,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When サプライヤーの「詳細」ボタンをクリックする"},{"pwStepLine":25,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示されている"}]},
  {"pwTestLine":28,"pickleLine":37,"tags":["@F-03-02-013","@UC-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given 製品ID \"5\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"5\"","children":[{"start":6,"value":"5","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When 「サプライヤー」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"サプライヤー","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then 「サプライヤー情報は登録されていません」メッセージが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end