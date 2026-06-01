// Generated from: features/F-04/F-04-01-004_supplier-list-display.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー一覧テーブル表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('初期表示で全サプライヤーが一覧表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤー一覧テーブルが表示される', null, { page }); 
    await And('サプライヤーテーブルに 12 件表示される', null, { page }); 
    await And('サプライヤー件数表示に「全 12 件」と表示される', null, { page }); 
  });

  test('テーブルの列構成が正しい', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーテーブルにコード列がある', null, { page }); 
    await And('サプライヤーテーブルに会社名列がある', null, { page }); 
    await And('サプライヤーテーブルにステータス列がある', null, { page }); 
    await And('サプライヤーテーブルに評価列がある', null, { page }); 
    await And('サプライヤーテーブルにメールアドレス列がある', null, { page }); 
    await And('サプライヤーテーブルに電話番号列がある', null, { page }); 
  });

  test('サプライヤーのコードと会社名が表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーコード「SUP-001」が表示される', null, { page }); 
    await And('サプライヤーコード「SUP-001」の会社名が「大塚商会」である', null, { page }); 
  });

  test('ACTIVEステータスのサプライヤーは「有効」と表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーコード「SUP-001」のステータスが「有効」である', null, { page }); 
  });

  test('SUSPENDEDステータスのサプライヤーは「停止中」と表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーコード「SUP-012」のステータスが「停止中」である', null, { page }); 
  });

  test('PENDING_APPROVALステータスのサプライヤーは「承認待ち」と表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーコード「SUP-011」のステータスが「承認待ち」である', null, { page }); 
  });

  test('評価が星表示と数値で表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーコード「SUP-001」の評価が「0.0」である', null, { page }); 
  });

  test('メールアドレスと電話番号が表示される', { tag: ['@F-04-01-004', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await Then('サプライヤーコード「SUP-001」のメールアドレスが空である', null, { page }); 
    await And('サプライヤーコード「SUP-001」の電話番号が空である', null, { page }); 
  });

  test('フィルタ結果が0件の場合に空状態メッセージが表示される', { tag: ['@F-04-01-004', '@データ状態'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー一覧画面にアクセスする', null, { page }); 
    await And('サプライヤー検索欄に「ZZZNOTEXIST」と入力する', null, { page }); 
    await Then('サプライヤー空状態メッセージが表示される', null, { page }); 
  });

  test.describe('全ロールでサプライヤー一覧にアクセスできる', () => {

    test('Example #1', { tag: ['@F-04-01-004', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー一覧テーブルが表示される', null, { page }); 
      await And('サプライヤーテーブルに 12 件表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-01-004', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー一覧テーブルが表示される', null, { page }); 
      await And('サプライヤーテーブルに 12 件表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-01-004', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー一覧テーブルが表示される', null, { page }); 
      await And('サプライヤーテーブルに 12 件表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-01-004', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー一覧テーブルが表示される', null, { page }); 
      await And('サプライヤーテーブルに 12 件表示される', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-01-004', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー一覧テーブルが表示される', null, { page }); 
      await And('サプライヤーテーブルに 12 件表示される', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-01-004_supplier-list-display.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー一覧テーブルが表示される","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And サプライヤー件数表示に「全 12 件」と表示される","stepMatchArguments":[{"group":{"start":12,"value":"全 12 件","children":[]}}]}]},
  {"pwTestLine":18,"pickleLine":19,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーテーブルにコード列がある","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに会社名列がある","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルにステータス列がある","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに評価列がある","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルにメールアドレス列がある","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに電話番号列がある","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":29,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーコード「SUP-001」が表示される","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And サプライヤーコード「SUP-001」の会社名が「大塚商会」である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}},{"group":{"start":24,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":34,"pickleLine":37,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーコード「SUP-001」のステータスが「有効」である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}},{"group":{"start":26,"value":"有効","children":[]}}]}]},
  {"pwTestLine":39,"pickleLine":42,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーコード「SUP-012」のステータスが「停止中」である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-012","children":[]}},{"group":{"start":26,"value":"停止中","children":[]}}]}]},
  {"pwTestLine":44,"pickleLine":47,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーコード「SUP-011」のステータスが「承認待ち」である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-011","children":[]}},{"group":{"start":26,"value":"承認待ち","children":[]}}]}]},
  {"pwTestLine":49,"pickleLine":54,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーコード「SUP-001」の評価が「0.0」である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}},{"group":{"start":23,"value":"0.0","children":[]}}]}]},
  {"pwTestLine":54,"pickleLine":59,"tags":["@F-04-01-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then サプライヤーコード「SUP-001」のメールアドレスが空である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}}]},{"pwStepLine":57,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And サプライヤーコード「SUP-001」の電話番号が空である","stepMatchArguments":[{"group":{"start":10,"value":"SUP-001","children":[]}}]}]},
  {"pwTestLine":60,"pickleLine":67,"tags":["@F-04-01-004","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"And サプライヤー検索欄に「ZZZNOTEXIST」と入力する","stepMatchArguments":[{"group":{"start":11,"value":"ZZZNOTEXIST","children":[]}}]},{"pwStepLine":63,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー空状態メッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":68,"pickleLine":83,"tags":["@F-04-01-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー一覧テーブルが表示される","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":75,"pickleLine":84,"tags":["@F-04-01-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー一覧テーブルが表示される","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":82,"pickleLine":85,"tags":["@F-04-01-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー一覧テーブルが表示される","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":89,"pickleLine":86,"tags":["@F-04-01-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー一覧テーブルが表示される","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":96,"pickleLine":87,"tags":["@F-04-01-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー一覧テーブルが表示される","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"And サプライヤーテーブルに 12 件表示される","stepMatchArguments":[{"group":{"start":12,"value":"12","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end