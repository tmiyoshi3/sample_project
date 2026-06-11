// Generated from: features/F-04/F-04-02-010_certifications-tab.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - 認証タブ', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('認証がカード形式で表示される', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「認証」タブをクリックする', null, { page }); 
    await Then('SD_認証カードが 3 件表示されている', null, { page }); 
  });

  test('認証カードに種別・ステータス・番号・期間が表示される', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「認証」タブをクリックする', null, { page }); 
    await Then('SD_認証カード「ISO 9001:2015」が表示されている', null, { page }); 
    await And('SD_認証カードにステータスが表示されている', null, { page }); 
    await And('SD_認証カードに認証番号が表示されている', null, { page }); 
    await And('SD_認証カードに発行日が表示されている', null, { page }); 
    await And('SD_認証カードに有効期限が表示されている', null, { page }); 
  });

  test('PENDING_RENEWALステータスの認証が表示される', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=2）にアクセスしている', null, { page }); 
    await When('SD_「認証」タブをクリックする', null, { page }); 
    await Then('SD_認証カードが表示されている', null, { page }); 
  });

  test('新規認証モーダルが表示される', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await And('SD_「認証」タブをクリックしている', null, { page }); 
    await When('SD_「+ 新規認証」ボタンをクリックする', null, { page }); 
    await Then('SD_認証モーダルが表示されている', null, { page }); 
    await And('SD_認証モーダルに種別セレクトがある', null, { page }); 
    await And('SD_認証モーダルに認証番号入力がある', null, { page }); 
    await And('SD_認証モーダルに発行日入力がある', null, { page }); 
    await And('SD_認証モーダルに有効期限入力がある', null, { page }); 
    await And('SD_認証モーダルにステータスセレクトがある', null, { page }); 
  });

  test('新規認証の保存はステータス値不正のためエラーになる', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await And('SD_「認証」タブをクリックしている', null, { page }); 
    await When('SD_「+ 新規認証」ボタンをクリックする', null, { page }); 
    await And('SD_認証種別に「ISO_9001」を選択する', null, { page }); 
    await And('SD_認証番号に「TEST-CERT-001」を入力する', null, { page }); 
    await And('SD_認証発行日を入力する', null, { page }); 
    await And('SD_認証有効期限を入力する', null, { page }); 
    await And('SD_認証ステータスに「有効」を選択する', null, { page }); 
    await And('SD_モーダル保存ボタンをクリックする', null, { page }); 
    await Then('SD_認証カードリストに新しいカードが追加されていない', null, { page }); 
  });

  test('API経由で作成した認証の編集モーダルに既存値がセットされる', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await And('SD_「認証」タブをクリックしている', null, { page }); 
    await And('SD_テスト用認証がAPI経由で作成されている', null, { page }); 
    await When('SD_テスト用認証の「編集」ボタンをクリックする', null, { page }); 
    await Then('SD_認証モーダルに既存値がセットされている', null, { page }); 
  });

  test('API経由で作成した認証を削除する', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await And('SD_「認証」タブをクリックしている', null, { page }); 
    await And('SD_テスト用認証がAPI経由で作成されている', null, { page }); 
    await When('SD_テスト用認証の「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「削除する」をクリックする', null, { page }); 
    await Then('SD_認証カードリストから「TEST-CERT-API」が削除されている', null, { page }); 
  });

  test('認証削除をキャンセルする', { tag: ['@F-04-02-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await And('SD_「認証」タブをクリックしている', null, { page }); 
    await When('SD_先頭認証カードの「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「キャンセル」をクリックする', null, { page }); 
    await Then('SD_確認ダイアログが閉じている', null, { page }); 
    await And('SD_認証カードの数が変わっていない', null, { page }); 
  });

  test('認証が0件の場合、空状態メッセージが表示される', { tag: ['@F-04-02-010', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=12）にアクセスしている', null, { page }); 
    await When('SD_「認証」タブをクリックする', null, { page }); 
    await Then('SD_「認証情報はありません」と表示されている', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-010_certifications-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When SD_「認証」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then SD_認証カードが 3 件表示されている","stepMatchArguments":[{"group":{"start":10,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":17,"pickleLine":16,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When SD_「認証」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then SD_認証カード「ISO 9001:2015」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"ISO 9001:2015","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And SD_認証カードにステータスが表示されている","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And SD_認証カードに認証番号が表示されている","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And SD_認証カードに発行日が表示されている","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And SD_認証カードに有効期限が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":26,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=2）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When SD_「認証」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then SD_認証カードが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":32,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":35,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"And SD_「認証」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":36,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When SD_「+ 新規認証」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then SD_認証モーダルが表示されている","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And SD_認証モーダルに種別セレクトがある","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And SD_認証モーダルに認証番号入力がある","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And SD_認証モーダルに発行日入力がある","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And SD_認証モーダルに有効期限入力がある","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And SD_認証モーダルにステータスセレクトがある","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":44,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":47,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"And SD_「認証」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":48,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When SD_「+ 新規認証」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"And SD_認証種別に「ISO_9001」を選択する","stepMatchArguments":[{"group":{"start":9,"value":"ISO_9001","children":[]}}]},{"pwStepLine":50,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And SD_認証番号に「TEST-CERT-001」を入力する","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CERT-001","children":[]}}]},{"pwStepLine":51,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"And SD_認証発行日を入力する","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And SD_認証有効期限を入力する","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And SD_認証ステータスに「有効」を選択する","stepMatchArguments":[{"group":{"start":12,"value":"有効","children":[]}}]},{"pwStepLine":54,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"And SD_モーダル保存ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then SD_認証カードリストに新しいカードが追加されていない","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":58,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":60,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And SD_「認証」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":61,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"And SD_テスト用認証がAPI経由で作成されている","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"When SD_テスト用認証の「編集」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then SD_認証モーダルに既存値がセットされている","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":66,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":68,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"And SD_「認証」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":69,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"And SD_テスト用認証がAPI経由で作成されている","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When SD_テスト用認証の「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「削除する」をクリックする","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"Then SD_認証カードリストから「TEST-CERT-API」が削除されている","stepMatchArguments":[{"group":{"start":14,"value":"TEST-CERT-API","children":[]}}]}]},
  {"pwTestLine":75,"pickleLine":75,"tags":["@F-04-02-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":77,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"And SD_「認証」タブをクリックしている","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":78,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When SD_先頭認証カードの「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「キャンセル」をクリックする","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then SD_確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"And SD_認証カードの数が変わっていない","stepMatchArguments":[]}]},
  {"pwTestLine":84,"pickleLine":84,"tags":["@F-04-02-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=12）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":86,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When SD_「認証」タブをクリックする","stepMatchArguments":[{"group":{"start":4,"value":"認証","children":[]}}]},{"pwStepLine":87,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then SD_「認証情報はありません」と表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end