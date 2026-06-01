// Generated from: features/F-04/F-04-01-005_compare.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー比較', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('サプライヤー一覧画面にアクセスする', null, { page }); 
  });
  
  test('初期状態では比較ボタンが無効で選択数0が表示される', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('サプライヤー比較ボタンのラベルが「比較 (0/3)」である', null, { page }); 
    await And('サプライヤー比較ボタンが無効である', null, { page }); 
  });

  test('1件選択すると比較ボタンのカウンタが更新されるが無効のまま', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await Then('サプライヤー比較ボタンのラベルが「比較 (1/3)」である', null, { page }); 
    await And('サプライヤー比較ボタンが無効である', null, { page }); 
  });

  test('2件選択すると比較ボタンが有効になる', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
    await Then('サプライヤー比較ボタンのラベルが「比較 (2/3)」である', null, { page }); 
    await And('サプライヤー比較ボタンが有効である', null, { page }); 
  });

  test('3件選択すると残りのチェックボックスが無効になる', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「Dell Technologies Direct」の比較チェックを選択する', null, { page }); 
    await Then('サプライヤー比較ボタンのラベルが「比較 (3/3)」である', null, { page }); 
    await And('サプライヤー比較ボタンが有効である', null, { page }); 
    await And('未選択サプライヤーの比較チェックが無効である', null, { page }); 
  });

  test('3件選択後に1件解除すると残りのチェックボックスが再度有効になる', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「Dell Technologies Direct」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「Dell Technologies Direct」の比較チェックを解除する', null, { page }); 
    await Then('サプライヤー比較ボタンのラベルが「比較 (2/3)」である', null, { page }); 
    await And('未選択サプライヤーの比較チェックが有効である', null, { page }); 
  });

  test('チェックボックスの選択と解除をトグルできる', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「大塚商会」の比較チェックを解除する', null, { page }); 
    await Then('サプライヤー比較ボタンのラベルが「比較 (0/3)」である', null, { page }); 
    await And('サプライヤー比較ボタンが無効である', null, { page }); 
  });

  test('2件選択して比較ボタンクリックで比較画面に遷移する', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー比較ボタンをクリックする', null, { page }); 
    await Then('サプライヤー比較画面が表示される', null, { page }); 
  });

  test.skip('比較画面にサプライヤー名が横並びで表示される', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系', '@skip'] }, async ({ When, Then, And }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する'); 
    await And('サプライヤー「SB C&S」の比較チェックを選択する'); 
    await And('サプライヤー比較ボタンをクリックする'); 
    await Then('サプライヤー比較画面が表示される'); 
    await And('比較画面にサプライヤー「大塚商会」のデータがある'); 
    await And('比較画面にサプライヤー「SB C&S」のデータがある'); 
  });

  test('比較画面に評価詳細が表示される', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー「テクノアルファ」の比較チェックを選択する', null, { page }); 
    await And('サプライヤー比較ボタンをクリックする', null, { page }); 
    await Then('サプライヤー比較画面が表示される', null, { page }); 
    await And('比較画面に評価情報がある', null, { page }); 
    await And('比較画面に発注実績がある', null, { page }); 
  });

  test.skip('3件選択して比較画面に遷移できる', { tag: ['@F-04-01-005', '@F-04-01-006', '@正常系', '@skip'] }, async ({ When, Then, And }) => { 
    await When('サプライヤー「大塚商会」の比較チェックを選択する'); 
    await And('サプライヤー「SB C&S」の比較チェックを選択する'); 
    await And('サプライヤー「Dell Technologies Direct」の比較チェックを選択する'); 
    await And('サプライヤー比較ボタンをクリックする'); 
    await Then('サプライヤー比較画面が表示される'); 
    await And('比較画面にサプライヤー「大塚商会」のデータがある'); 
    await And('比較画面にサプライヤー「SB C&S」のデータがある'); 
    await And('比較画面にサプライヤー「Dell Technologies Direct」のデータがある'); 
  });

  test.describe('全ロールで比較操作ができる', () => {

    test('Example #1', { tag: ['@F-04-01-005', '@F-04-01-006', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
      await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
      await Then('サプライヤー比較ボタンが有効である', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-01-005', '@F-04-01-006', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
      await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
      await Then('サプライヤー比較ボタンが有効である', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-01-005', '@F-04-01-006', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
      await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
      await Then('サプライヤー比較ボタンが有効である', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-01-005', '@F-04-01-006', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
      await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
      await Then('サプライヤー比較ボタンが有効である', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-01-005', '@F-04-01-006', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('サプライヤー一覧画面にアクセスする', null, { page }); 
      await When('サプライヤー「大塚商会」の比較チェックを選択する', null, { page }); 
      await And('サプライヤー「SB C&S」の比較チェックを選択する', null, { page }); 
      await Then('サプライヤー比較ボタンが有効である', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-01-005_compare.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンのラベルが「比較 (0/3)」である","stepMatchArguments":[{"group":{"start":17,"value":"比較 (0/3)","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And サプライヤー比較ボタンが無効である","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":18,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンのラベルが「比較 (1/3)」である","stepMatchArguments":[{"group":{"start":17,"value":"比較 (1/3)","children":[]}}]},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And サプライヤー比較ボタンが無効である","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":24,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンのラベルが「比較 (2/3)」である","stepMatchArguments":[{"group":{"start":17,"value":"比較 (2/3)","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And サプライヤー比較ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":31,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":32,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":33,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And サプライヤー「Dell Technologies Direct」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"Dell Technologies Direct","children":[]}}]},{"pwStepLine":34,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンのラベルが「比較 (3/3)」である","stepMatchArguments":[{"group":{"start":17,"value":"比較 (3/3)","children":[]}}]},{"pwStepLine":35,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And サプライヤー比較ボタンが有効である","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And 未選択サプライヤーの比較チェックが無効である","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":40,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":41,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And サプライヤー「Dell Technologies Direct」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"Dell Technologies Direct","children":[]}}]},{"pwStepLine":43,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And サプライヤー「Dell Technologies Direct」の比較チェックを解除する","stepMatchArguments":[{"group":{"start":7,"value":"Dell Technologies Direct","children":[]}}]},{"pwStepLine":44,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンのラベルが「比較 (2/3)」である","stepMatchArguments":[{"group":{"start":17,"value":"比較 (2/3)","children":[]}}]},{"pwStepLine":45,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And 未選択サプライヤーの比較チェックが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":49,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":50,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"And サプライヤー「大塚商会」の比較チェックを解除する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":51,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンのラベルが「比較 (0/3)」である","stepMatchArguments":[{"group":{"start":17,"value":"比較 (0/3)","children":[]}}]},{"pwStepLine":52,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And サプライヤー比較ボタンが無効である","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":58,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":57,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":58,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"And サプライヤー比較ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":65,"skipped":true,"tags":["@F-04-01-005","@F-04-01-006","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true},{"pwStepLine":63,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する"},{"pwStepLine":64,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する"},{"pwStepLine":65,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"And サプライヤー比較ボタンをクリックする"},{"pwStepLine":66,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較画面が表示される"},{"pwStepLine":67,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And 比較画面にサプライヤー「大塚商会」のデータがある"},{"pwStepLine":68,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"And 比較画面にサプライヤー「SB C&S」のデータがある"}]},
  {"pwTestLine":71,"pickleLine":74,"tags":["@F-04-01-005","@F-04-01-006","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":73,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"And サプライヤー「テクノアルファ」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"テクノアルファ","children":[]}}]},{"pwStepLine":74,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"And サプライヤー比較ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較画面が表示される","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"And 比較画面に評価情報がある","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And 比較画面に発注実績がある","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":83,"skipped":true,"tags":["@F-04-01-005","@F-04-01-006","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true},{"pwStepLine":81,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する"},{"pwStepLine":82,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する"},{"pwStepLine":83,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"And サプライヤー「Dell Technologies Direct」の比較チェックを選択する"},{"pwStepLine":84,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"And サプライヤー比較ボタンをクリックする"},{"pwStepLine":85,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較画面が表示される"},{"pwStepLine":86,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"And 比較画面にサプライヤー「大塚商会」のデータがある"},{"pwStepLine":87,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"And 比較画面にサプライヤー「SB C&S」のデータがある"},{"pwStepLine":88,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"And 比較画面にサプライヤー「Dell Technologies Direct」のデータがある"}]},
  {"pwTestLine":93,"pickleLine":105,"tags":["@F-04-01-005","@F-04-01-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":95,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":97,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":98,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":101,"pickleLine":106,"tags":["@F-04-01-005","@F-04-01-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":103,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":105,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":106,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":109,"pickleLine":107,"tags":["@F-04-01-005","@F-04-01-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":111,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":113,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":114,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":117,"pickleLine":108,"tags":["@F-04-01-005","@F-04-01-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":119,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":121,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":122,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンが有効である","stepMatchArguments":[]}]},
  {"pwTestLine":125,"pickleLine":109,"tags":["@F-04-01-005","@F-04-01-006","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","isBg":true,"stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":127,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And サプライヤー一覧画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When サプライヤー「大塚商会」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]},{"pwStepLine":129,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And サプライヤー「SB C&S」の比較チェックを選択する","stepMatchArguments":[{"group":{"start":7,"value":"SB C&S","children":[]}}]},{"pwStepLine":130,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then サプライヤー比較ボタンが有効である","stepMatchArguments":[]}]},
]; // bdd-data-end