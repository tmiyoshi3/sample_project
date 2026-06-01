// Generated from: features/F-03/F-03-02-014_document-tab.feature
import { test } from "playwright-bdd";

test.describe('ドキュメントタブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('ドキュメントが登録されている製品でリストが表示される', { tag: ['@F-03-02-014', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「ドキュメント」タブをクリックする', null, { page }); 
    await Then('ドキュメントリストが表示されている', null, { page }); 
    await And('ドキュメントリストにファイルタイプアイコンが表示されている', null, { page }); 
    await And('ドキュメントリストにドキュメント名が表示されている', null, { page }); 
    await And('ドキュメントリストにメタ情報が表示されている', null, { page }); 
    await And('ドキュメントリストに「ダウンロード」ボタンが表示されている', null, { page }); 
  });

  test.skip('ダウンロードボタンクリックでファイルダウンロードが開始される', { tag: ['@F-03-02-014', '@UC-010', '@正常系', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している'); 
    await And('「ドキュメント」タブをクリックしている'); 
    await When('「ダウンロード」ボタンをクリックする'); 
    await Then('ファイルダウンロードが開始される'); 
  });

  test('ドキュメント未登録の製品で空状態メッセージが表示される', { tag: ['@F-03-02-014', '@UC-010', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "50" の製品詳細画面を表示している', null, { page }); 
    await When('「ドキュメント」タブをクリックする', null, { page }); 
    await Then('「ドキュメントは登録されていません」メッセージが表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-014_document-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-014","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 「ドキュメント」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"ドキュメント","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then ドキュメントリストが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And ドキュメントリストにファイルタイプアイコンが表示されている","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And ドキュメントリストにドキュメント名が表示されている","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And ドキュメントリストにメタ情報が表示されている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And ドキュメントリストに「ダウンロード」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":23,"skipped":true,"tags":["@F-03-02-014","@UC-010","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":22,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している"},{"pwStepLine":23,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"And 「ドキュメント」タブをクリックしている"},{"pwStepLine":24,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When 「ダウンロード」ボタンをクリックする"},{"pwStepLine":25,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then ファイルダウンロードが開始される"}]},
  {"pwTestLine":28,"pickleLine":35,"tags":["@F-03-02-014","@UC-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given 製品ID \"50\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"50\"","children":[{"start":6,"value":"50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When 「ドキュメント」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"ドキュメント","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then 「ドキュメントは登録されていません」メッセージが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end