// Generated from: features/F-04/F-04-01-001_search-filter.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー検索・フィルタ', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('サプライヤー一覧画面にアクセスする', null, { page }); 
  });
  
  test('会社名で部分一致検索できる', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー検索欄に「大塚」と入力する', null, { page }); 
    await Then('サプライヤーテーブルに 1 件表示される', null, { page }); 
    await And('サプライヤーコード「SUP-001」が表示される', null, { page }); 
  });

  test('コードで部分一致検索できる', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー検索欄に「SUP-01」と入力する', null, { page }); 
    await Then('サプライヤーテーブルに 3 件表示される', null, { page }); 
  });

  test('該当なしの検索では空状態メッセージが表示される', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー検索欄に「ZZZNOTEXIST」と入力する', null, { page }); 
    await Then('サプライヤー空状態メッセージが表示される', null, { page }); 
  });

  test('検索をクリアすると全件表示に戻る', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー検索欄に「大塚」と入力する', null, { page }); 
    await And('サプライヤー検索欄をクリアする', null, { page }); 
    await Then('サプライヤーテーブルに 12 件表示される', null, { page }); 
  });

  test('ステータスフィルタで「取引中」を選択するとACTIVEサプライヤーが表示される', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤーステータスフィルタで「取引中」を選択する', null, { page }); 
    await Then('サプライヤーテーブルに 10 件表示される', null, { page }); 
  });

  test('ステータスフィルタで「取引停止」を選択すると0件になる', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤーステータスフィルタで「取引停止」を選択する', null, { page }); 
    await Then('サプライヤー空状態メッセージが表示される', null, { page }); 
  });

  test('ステータスフィルタで「審査中」を選択すると0件になる', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤーステータスフィルタで「審査中」を選択する', null, { page }); 
    await Then('サプライヤー空状態メッセージが表示される', null, { page }); 
  });

  test('ステータスフィルタで「ブロック済み」を選択すると0件になる', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤーステータスフィルタで「ブロック済み」を選択する', null, { page }); 
    await Then('サプライヤー空状態メッセージが表示される', null, { page }); 
  });

  test('評価フィルタで「1以上」を選択すると0件になる', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー評価フィルタで「1以上」を選択する', null, { page }); 
    await Then('サプライヤー空状態メッセージが表示される', null, { page }); 
  });

  test('評価フィルタを「指定なし」に戻すと全件表示される', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー評価フィルタで「1以上」を選択する', null, { page }); 
    await And('サプライヤー評価フィルタで「指定なし」を選択する', null, { page }); 
    await Then('サプライヤーテーブルに 12 件表示される', null, { page }); 
  });

  test('検索とステータスフィルタを組み合わせて絞り込める', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー検索欄に「大塚」と入力する', null, { page }); 
    await And('サプライヤーステータスフィルタで「取引中」を選択する', null, { page }); 
    await Then('サプライヤーテーブルに 1 件表示される', null, { page }); 
    await And('サプライヤーコード「SUP-001」が表示される', null, { page }); 
  });

  test('フィルターをリセットすると全フィルタが解除される', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤーステータスフィルタで「取引中」を選択する', null, { page }); 
    await And('サプライヤーフィルターをリセットする', null, { page }); 
    await Then('サプライヤーテーブルに 12 件表示される', null, { page }); 
    await And('サプライヤーステータスフィルタが「すべて」になっている', null, { page }); 
  });

  test('フィルタ適用時にリセットボタンが出現する', { tag: ['@F-04-01-001', '@F-04-01-002', '@F-04-01-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤーステータスフィルタで「取引中」を選択する', null, { page }); 
    await Then('サプライヤーリセットボタンが表示される', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-01-001_search-filter.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When サプライヤー検索欄に「大塚」と入力する","stepMatchArguments":[{"group":{"start":11,"value":"大塚","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 1 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And サプライヤーコード「SUP-001」が表示される","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}}]}]},
  {"pwTestLine":18,"pickleLine":19,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When サプライヤー検索欄に「SUP-01」と入力する","stepMatchArguments":[{"group":{"start":11,"value":"SUP-01","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 3 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":23,"pickleLine":24,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When サプライヤー検索欄に「ZZZNOTEXIST」と入力する","stepMatchArguments":[{"group":{"start":11,"value":"ZZZNOTEXIST","children":[]}}]},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー空状態メッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":29,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When サプライヤー検索欄に「大塚」と入力する","stepMatchArguments":[{"group":{"start":11,"value":"大塚","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And サプライヤー検索欄をクリアする","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":34,"pickleLine":37,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When サプライヤーステータスフィルタで「取引中」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"取引中","children":[]}}]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 10 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"10","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":39,"pickleLine":42,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When サプライヤーステータスフィルタで「取引停止」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"取引停止","children":[]}}]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー空状態メッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":47,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When サプライヤーステータスフィルタで「審査中」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"審査中","children":[]}}]},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー空状態メッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":52,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When サプライヤーステータスフィルタで「ブロック済み」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"ブロック済み","children":[]}}]},{"pwStepLine":51,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー空状態メッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":54,"pickleLine":59,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When サプライヤー評価フィルタで「1以上」を選択する","stepMatchArguments":[{"group":{"start":14,"value":"1以上","children":[]}}]},{"pwStepLine":56,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー空状態メッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":64,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When サプライヤー評価フィルタで「1以上」を選択する","stepMatchArguments":[{"group":{"start":14,"value":"1以上","children":[]}}]},{"pwStepLine":61,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And サプライヤー評価フィルタで「指定なし」を選択する","stepMatchArguments":[{"group":{"start":14,"value":"指定なし","children":[]}}]},{"pwStepLine":62,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":65,"pickleLine":72,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When サプライヤー検索欄に「大塚」と入力する","stepMatchArguments":[{"group":{"start":11,"value":"大塚","children":[]}}]},{"pwStepLine":67,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"And サプライヤーステータスフィルタで「取引中」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"取引中","children":[]}}]},{"pwStepLine":68,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 1 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":69,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"And サプライヤーコード「SUP-001」が表示される","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}}]}]},
  {"pwTestLine":72,"pickleLine":81,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"When サプライヤーステータスフィルタで「取引中」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"取引中","children":[]}}]},{"pwStepLine":74,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"And サプライヤーフィルターをリセットする","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":76,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"And サプライヤーステータスフィルタが「すべて」になっている","stepMatchArguments":[{"group":{"start":17,"value":"すべて","children":[]}}]}]},
  {"pwTestLine":79,"pickleLine":88,"tags":["@F-04-01-001","@F-04-01-002","@F-04-01-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When サプライヤーステータスフィルタで「取引中」を選択する","stepMatchArguments":[{"group":{"start":17,"value":"取引中","children":[]}}]},{"pwStepLine":81,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーリセットボタンが表示される","stepMatchArguments":[]}]},
]; // bdd-data-end