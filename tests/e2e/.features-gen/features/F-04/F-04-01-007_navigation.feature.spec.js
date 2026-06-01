// Generated from: features/F-04/F-04-01-007_navigation.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー一覧画面のナビゲーション', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('サプライヤー一覧画面にアクセスする', null, { page }); 
  });
  
  test('新規登録ボタンクリックでサプライヤー新規登録画面に遷移する', { tag: ['@F-04-01-007', '@F-04-01-008', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('サプライヤー新規登録ボタンをクリックする', null, { page }); 
    await Then('サプライヤー新規登録画面が表示される', null, { page }); 
  });

  test('新規登録ボタンは常に有効である', { tag: ['@F-04-01-007', '@F-04-01-008', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('サプライヤー新規登録ボタンが表示されている', null, { page }); 
    await And('サプライヤー新規登録ボタンが有効である', null, { page }); 
  });

  test('サプライヤー行クリックで詳細画面に遷移する', { tag: ['@F-04-01-007', '@F-04-01-008', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の行をクリックする', null, { page }); 
    await Then('サプライヤー詳細画面が表示される', null, { page }); 
    await And('サプライヤー詳細画面に「大塚商会」の情報がある', null, { page }); 
  });

  test('別のサプライヤーの行クリックでも詳細画面に遷移する', { tag: ['@F-04-01-007', '@F-04-01-008', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「テクノアルファ」の行をクリックする', null, { page }); 
    await Then('サプライヤー詳細画面が表示される', null, { page }); 
    await And('サプライヤー詳細画面に「テクノアルファ」の情報がある', null, { page }); 
  });

  test.describe('全ロールで新規登録ボタンが利用できる', () => {

    test('Example #1', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー新規登録ボタンが表示されている', null, { page }); 
      await And('サプライヤー新規登録ボタンが有効である', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー新規登録ボタンが表示されている', null, { page }); 
      await And('サプライヤー新規登録ボタンが有効である', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー新規登録ボタンが表示されている', null, { page }); 
      await And('サプライヤー新規登録ボタンが有効である', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー新規登録ボタンが表示されている', null, { page }); 
      await And('サプライヤー新規登録ボタンが有効である', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await Then('サプライヤー新規登録ボタンが表示されている', null, { page }); 
      await And('サプライヤー新規登録ボタンが有効である', null, { page }); 
    });

  });

  test.describe('全ロールでサプライヤー行クリック遷移ができる', () => {

    test('Example #1', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の行をクリックする', null, { page }); 
      await Then('サプライヤー詳細画面が表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の行をクリックする', null, { page }); 
      await Then('サプライヤー詳細画面が表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の行をクリックする', null, { page }); 
      await Then('サプライヤー詳細画面が表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の行をクリックする', null, { page }); 
      await Then('サプライヤー詳細画面が表示される', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-01-007', '@F-04-01-008', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の行をクリックする', null, { page }); 
      await Then('サプライヤー詳細画面が表示される', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-01-007_navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":["@F-04-01-007","@F-04-01-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When サプライヤー新規登録ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":18,"tags":["@F-04-01-007","@F-04-01-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And サプライヤー新規登録ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":25,"tags":["@F-04-01-007","@F-04-01-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And サプライヤー詳細画面に「大塚商会」の情報がある","stepMatchArguments":[{"group":{"start":12,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":28,"pickleLine":31,"tags":["@F-04-01-007","@F-04-01-008","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When サプライヤー「テクノアルファ」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"テクノアルファ","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And サプライヤー詳細画面に「テクノアルファ」の情報がある","stepMatchArguments":[{"group":{"start":12,"value":"テクノアルファ","children":[]}}]}]},
  {"pwTestLine":36,"pickleLine":47,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And サプライヤー新規登録ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":48,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And サプライヤー新規登録ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":49,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And サプライヤー新規登録ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":50,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And サプライヤー新規登録ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":51,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー新規登録ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And サプライヤー新規登録ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":75,"pickleLine":62,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":79,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":63,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":86,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":64,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":93,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":65,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":100,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":103,"pickleLine":66,"tags":["@F-04-01-007","@F-04-01-008","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":105,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の行をクリックする","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":107,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー詳細画面が表示される","stepMatchArguments":[]}]},
]; // bdd-data-end