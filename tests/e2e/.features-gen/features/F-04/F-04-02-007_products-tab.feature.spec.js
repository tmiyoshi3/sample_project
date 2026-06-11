// Generated from: features/F-04/F-04-02-007_products-tab.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - 製品タブ', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('取扱製品がテーブルに表示される', { tag: ['@F-04-02-007', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「製品」タブをクリックする', null, { page }); 
    await Then('SD_製品テーブルが表示されている', null, { page }); 
    await And('SD_製品テーブルに 14 件の行がある', null, { page }); 
  });

  test('製品テーブルの列が正しく表示される', { tag: ['@F-04-02-007', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「製品」タブをクリックする', null, { page }); 
    await Then('SD_製品テーブルに「SKU」列がある', null, { page }); 
    await And('SD_製品テーブルに「製品名」列がある', null, { page }); 
    await And('SD_製品テーブルに「仕入先SKU」列がある', null, { page }); 
    await And('SD_製品テーブルに「単価」列がある', null, { page }); 
    await And('SD_製品テーブルに「リードタイム」列がある', null, { page }); 
  });

  test('「詳細」ボタンで製品詳細画面に遷移する', { tag: ['@F-04-02-007', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「製品」タブをクリックしている', null, { page }); 
    await When('SD_製品テーブル先頭行の「詳細」ボタンをクリックする', null, { page }); 
    await Then('SD_製品詳細画面に遷移している', null, { page }); 
  });

  test('テスト用製品紐付けを削除する', { tag: ['@F-04-02-007', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await And('SD_「製品」タブをクリックしている', null, { page }); 
    await And('SD_テスト用製品紐付けを追加している', null, { page }); 
    await When('SD_追加した製品の「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「削除する」をクリックする', null, { page }); 
    await Then('SD_製品テーブルから該当行が削除されている', null, { page }); 
  });

  test('製品紐付け削除をキャンセルする', { tag: ['@F-04-02-007', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「製品」タブをクリックしている', null, { page }); 
    await When('SD_製品テーブル先頭行の「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「キャンセル」をクリックする', null, { page }); 
    await Then('SD_確認ダイアログが閉じている', null, { page }); 
    await And('SD_製品テーブルの行数が変わっていない', null, { page }); 
  });

  test('取扱製品が0件の場合、空状態メッセージが表示される', { tag: ['@F-04-02-007', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await When('SD_「製品」タブをクリックする', null, { page }); 
    await Then('SD_「取扱製品はありません」と表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-007_products-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When SD_「製品」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then SD_製品テーブルが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And SD_製品テーブルに 14 件の行がある","stepMatchArguments":[{"group":{"start":11,"value":"14","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":18,"pickleLine":17,"tags":["@F-04-02-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When SD_「製品」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then SD_製品テーブルに「SKU」列がある","stepMatchArguments":[{"group":{"start":11,"value":"SKU","children":[]}}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And SD_製品テーブルに「製品名」列がある","stepMatchArguments":[{"group":{"start":11,"value":"製品名","children":[]}}]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And SD_製品テーブルに「仕入先SKU」列がある","stepMatchArguments":[{"group":{"start":11,"value":"仕入先SKU","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And SD_製品テーブルに「単価」列がある","stepMatchArguments":[{"group":{"start":11,"value":"単価","children":[]}}]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And SD_製品テーブルに「リードタイム」列がある","stepMatchArguments":[{"group":{"start":11,"value":"リードタイム","children":[]}}]}]},
  {"pwTestLine":28,"pickleLine":27,"tags":["@F-04-02-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"And SD_「製品」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When SD_製品テーブル先頭行の「詳細」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then SD_製品詳細画面に遷移している","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":34,"tags":["@F-04-02-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":37,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And SD_「製品」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"And SD_テスト用製品紐付けを追加している","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When SD_追加した製品の「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「削除する」をクリックする","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_製品テーブルから該当行が削除されている","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":43,"tags":["@F-04-02-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":46,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And SD_「製品」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":47,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When SD_製品テーブル先頭行の「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「キャンセル」をクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then SD_確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"And SD_製品テーブルの行数が変わっていない","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":52,"tags":["@F-04-02-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":55,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When SD_「製品」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"製品","children":[]}}]},{"pwStepLine":56,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then SD_「取扱製品はありません」と表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end