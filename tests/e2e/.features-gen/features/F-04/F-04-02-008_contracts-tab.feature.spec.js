// Generated from: features/F-04/F-04-02-008_contracts-tab.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - 契約タブ', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('契約がテーブルに表示される', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「契約」タブをクリックする', null, { page }); 
    await Then('SD_契約テーブルが表示されている', null, { page }); 
    await And('SD_契約テーブルに「CNT-2024-001」がある', null, { page }); 
  });

  test('契約のステータスラベルが正しく表示される', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「契約」タブをクリックする', null, { page }); 
    await Then('SD_契約テーブルにステータス「有効」がある', null, { page }); 
  });

  test('EXPIREDステータスの契約は「期限切れ」と表示される', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=2）にアクセスしている', null, { page }); 
    await When('SD_「契約」タブをクリックする', null, { page }); 
    await Then('SD_契約テーブルにステータス「期限切れ」がある', null, { page }); 
  });

  test('新規契約を作成する', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「契約」タブをクリックしている', null, { page }); 
    await When('SD_「+ 新規契約」ボタンをクリックする', null, { page }); 
    await Then('SD_契約モーダルが表示されている', null, { page }); 
    await When('SD_契約番号に「TEST-CNT-001」を入力する', null, { page }); 
    await And('SD_契約名に「テスト契約」を入力する', null, { page }); 
    await And('SD_契約開始日を入力する', null, { page }); 
    await And('SD_契約終了日を入力する', null, { page }); 
    await And('SD_契約ステータスに「下書き」を選択する', null, { page }); 
    await And('SD_モーダル保存ボタンをクリックする', null, { page }); 
    await Then('SD_契約テーブルに「TEST-CNT-001」がある', null, { page }); 
  });

  test('既存契約を編集する', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「契約」タブをクリックしている', null, { page }); 
    await And('SD_テスト用契約「TEST-CNT-001」が作成されている', null, { page }); 
    await When('SD_テスト用契約の「編集」ボタンをクリックする', null, { page }); 
    await Then('SD_契約モーダルに既存値がセットされている', null, { page }); 
    await When('SD_契約条件を「テスト条件更新済み」に変更する', null, { page }); 
    await And('SD_モーダル保存ボタンをクリックする', null, { page }); 
    await Then('SD_契約テーブルに「テスト条件更新済み」が表示されている', null, { page }); 
  });

  test('テスト用契約を削除する', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「契約」タブをクリックしている', null, { page }); 
    await And('SD_テスト用契約「TEST-CNT-001」が作成されている', null, { page }); 
    await When('SD_テスト用契約の「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「削除する」をクリックする', null, { page }); 
    await Then('SD_契約テーブルから「TEST-CNT-001」が削除されている', null, { page }); 
  });

  test('契約削除をキャンセルする', { tag: ['@F-04-02-008', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「契約」タブをクリックしている', null, { page }); 
    await When('SD_契約テーブル先頭行の「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「キャンセル」をクリックする', null, { page }); 
    await Then('SD_確認ダイアログが閉じている', null, { page }); 
    await And('SD_契約テーブルの行数が変わっていない', null, { page }); 
  });

  test('契約が0件の場合、空状態メッセージが表示される', { tag: ['@F-04-02-008', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await When('SD_「契約」タブをクリックする', null, { page }); 
    await Then('SD_「契約はありません」と表示されている', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-008_contracts-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When SD_「契約」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then SD_契約テーブルが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And SD_契約テーブルに「CNT-2024-001」がある","stepMatchArguments":[{"group":{"start":11,"value":"CNT-2024-001","children":[]}}]}]},
  {"pwTestLine":18,"pickleLine":17,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When SD_「契約」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then SD_契約テーブルにステータス「有効」がある","stepMatchArguments":[{"group":{"start":16,"value":"有効","children":[]}}]}]},
  {"pwTestLine":24,"pickleLine":23,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=2）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When SD_「契約」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then SD_契約テーブルにステータス「期限切れ」がある","stepMatchArguments":[{"group":{"start":16,"value":"期限切れ","children":[]}}]}]},
  {"pwTestLine":30,"pickleLine":29,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"And SD_「契約」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":33,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When SD_「+ 新規契約」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then SD_契約モーダルが表示されている","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When SD_契約番号に「TEST-CNT-001」を入力する","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CNT-001","children":[]}}]},{"pwStepLine":36,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And SD_契約名に「テスト契約」を入力する","stepMatchArguments":[{"group":{"start":8,"value":"テスト契約","children":[]}}]},{"pwStepLine":37,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And SD_契約開始日を入力する","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And SD_契約終了日を入力する","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And SD_契約ステータスに「下書き」を選択する","stepMatchArguments":[{"group":{"start":12,"value":"下書き","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And SD_モーダル保存ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_契約テーブルに「TEST-CNT-001」がある","stepMatchArguments":[{"group":{"start":11,"value":"TEST-CNT-001","children":[]}}]}]},
  {"pwTestLine":44,"pickleLine":43,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":46,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And SD_「契約」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":47,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"And SD_テスト用契約「TEST-CNT-001」が作成されている","stepMatchArguments":[{"group":{"start":10,"value":"TEST-CNT-001","children":[]}}]},{"pwStepLine":48,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When SD_テスト用契約の「編集」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then SD_契約モーダルに既存値がセットされている","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When SD_契約条件を「テスト条件更新済み」に変更する","stepMatchArguments":[{"group":{"start":9,"value":"テスト条件更新済み","children":[]}}]},{"pwStepLine":51,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And SD_モーダル保存ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then SD_契約テーブルに「テスト条件更新済み」が表示されている","stepMatchArguments":[{"group":{"start":11,"value":"テスト条件更新済み","children":[]}}]}]},
  {"pwTestLine":55,"pickleLine":54,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":57,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And SD_「契約」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":58,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"And SD_テスト用契約「TEST-CNT-001」が作成されている","stepMatchArguments":[{"group":{"start":10,"value":"TEST-CNT-001","children":[]}}]},{"pwStepLine":59,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"When SD_テスト用契約の「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「削除する」をクリックする","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then SD_契約テーブルから「TEST-CNT-001」が削除されている","stepMatchArguments":[{"group":{"start":12,"value":"TEST-CNT-001","children":[]}}]}]},
  {"pwTestLine":64,"pickleLine":63,"tags":["@F-04-02-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":66,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"And SD_「契約」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":67,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When SD_契約テーブル先頭行の「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「キャンセル」をクリックする","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then SD_確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"And SD_契約テーブルの行数が変わっていない","stepMatchArguments":[]}]},
  {"pwTestLine":73,"pickleLine":72,"tags":["@F-04-02-008","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":75,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When SD_「契約」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"契約","children":[]}}]},{"pwStepLine":76,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then SD_「契約はありません」と表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end