// Generated from: features/F-04/F-04-02-009_ratings-tab.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - 評価履歴タブ', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('評価サマリーと評価エントリが表示される', { tag: ['@F-04-02-009', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「評価履歴」タブをクリックする', null, { page }); 
    await Then('SD_平均評価サマリーが表示されている', null, { page }); 
    await And('SD_評価件数「4 件の評価」が表示されている', null, { page }); 
    await And('SD_評価エントリが 4 件表示されている', null, { page }); 
  });

  test('評価エントリに4カテゴリのスコアが表示される', { tag: ['@F-04-02-009', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「評価履歴」タブをクリックする', null, { page }); 
    await Then('SD_品質スコアバーが表示されている', null, { page }); 
    await And('SD_納期スコアバーが表示されている', null, { page }); 
    await And('SD_価格スコアバーが表示されている', null, { page }); 
    await And('SD_対応スコアバーが表示されている', null, { page }); 
  });

  test('評価エントリにコメントと評価者が表示される', { tag: ['@F-04-02-009', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「評価履歴」タブをクリックする', null, { page }); 
    await Then('SD_評価コメントが表示されている', null, { page }); 
    await And('SD_評価者が表示されている', null, { page }); 
  });

  test('新規評価を追加する', { tag: ['@F-04-02-009', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=2）にアクセスしている', null, { page }); 
    await And('SD_「評価履歴」タブをクリックしている', null, { page }); 
    await When('SD_「+ 新規評価」ボタンをクリックする', null, { page }); 
    await Then('SD_評価モーダルが表示されている', null, { page }); 
    await And('SD_品質スライダーが表示されている', null, { page }); 
    await And('SD_納期スライダーが表示されている', null, { page }); 
    await And('SD_価格スライダーが表示されている', null, { page }); 
    await And('SD_対応スライダーが表示されている', null, { page }); 
    await When('SD_品質スコアに「4.0」を設定する', null, { page }); 
    await And('SD_納期スコアに「3.5」を設定する', null, { page }); 
    await And('SD_価格スコアに「4.5」を設定する', null, { page }); 
    await And('SD_対応スコアに「4.0」を設定する', null, { page }); 
    await And('SD_コメントに「TEST-RATING」を入力する', null, { page }); 
    await And('SD_モーダル保存ボタンをクリックする', null, { page }); 
    await Then('SD_評価リストに新しいエントリが追加されている', null, { page }); 
  });

  test('評価追加後に平均評価が再計算される', { tag: ['@F-04-02-009', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=2）にアクセスしている', null, { page }); 
    await And('SD_「評価履歴」タブをクリックしている', null, { page }); 
    await And('SD_新規評価を追加している', null, { page }); 
    await Then('SD_平均評価サマリーが更新されている', null, { page }); 
  });

  test('評価が0件の場合、空状態メッセージと新規評価ボタンが表示される', { tag: ['@F-04-02-009', '@データ状態'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=3）にアクセスしている', null, { page }); 
    await When('SD_「評価履歴」タブをクリックする', null, { page }); 
    await Then('SD_「評価履歴はありません」と表示されている', null, { page }); 
    await And('SD_「+ 新規評価」ボタンが表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-009_ratings-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When SD_「評価履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then SD_平均評価サマリーが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And SD_評価件数「4 件の評価」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"4 件の評価","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And SD_評価エントリが 4 件表示されている","stepMatchArguments":[{"group":{"start":11,"value":"4","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":19,"pickleLine":18,"tags":["@F-04-02-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When SD_「評価履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then SD_品質スコアバーが表示されている","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And SD_納期スコアバーが表示されている","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And SD_価格スコアバーが表示されている","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And SD_対応スコアバーが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":27,"tags":["@F-04-02-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When SD_「評価履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then SD_評価コメントが表示されている","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And SD_評価者が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":34,"tags":["@F-04-02-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=2）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":37,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And SD_「評価履歴」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When SD_「+ 新規評価」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then SD_評価モーダルが表示されている","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And SD_品質スライダーが表示されている","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And SD_納期スライダーが表示されている","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And SD_価格スライダーが表示されている","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And SD_対応スライダーが表示されている","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When SD_品質スコアに「4.0」を設定する","stepMatchArguments":[{"group":{"start":10,"value":"4.0","children":[]}}]},{"pwStepLine":45,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And SD_納期スコアに「3.5」を設定する","stepMatchArguments":[{"group":{"start":10,"value":"3.5","children":[]}}]},{"pwStepLine":46,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And SD_価格スコアに「4.5」を設定する","stepMatchArguments":[{"group":{"start":10,"value":"4.5","children":[]}}]},{"pwStepLine":47,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And SD_対応スコアに「4.0」を設定する","stepMatchArguments":[{"group":{"start":10,"value":"4.0","children":[]}}]},{"pwStepLine":48,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And SD_コメントに「TEST-RATING」を入力する","stepMatchArguments":[{"group":{"start":9,"value":"TEST-RATING","children":[]}}]},{"pwStepLine":49,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"And SD_モーダル保存ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then SD_評価リストに新しいエントリが追加されている","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":52,"tags":["@F-04-02-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=2）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":55,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And SD_「評価履歴」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":56,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"And SD_新規評価を追加している","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then SD_平均評価サマリーが更新されている","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":59,"tags":["@F-04-02-009","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=3）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":62,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When SD_「評価履歴」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"評価履歴","children":[]}}]},{"pwStepLine":63,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then SD_「評価履歴はありません」と表示されている","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And SD_「+ 新規評価」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end