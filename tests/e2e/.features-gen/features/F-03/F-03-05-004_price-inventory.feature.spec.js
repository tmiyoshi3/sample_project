// Generated from: features/F-03/F-03-05-004_price-inventory.feature
import { test } from "playwright-bdd";

test.describe('価格・在庫情報入力', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('製品登録画面でステップ2が表示されている', null, { page }); 
  });
  
  test('デフォルト値が設定された状態で表示される', { tag: ['@F-03-05-004', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('単価が "" に設定されている', null, { page }); 
    await And('単位が "個" に設定されている', null, { page }); 
    await And('最低発注数が "1" に設定されている', null, { page }); 
    await And('リードタイムが "7" に設定されている', null, { page }); 
  });

  test('単価を入力して次のステップに遷移できる', { tag: ['@F-03-05-004', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('単価に "1000" を入力する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ3「仕様」が表示される', null, { page }); 
  });

  test('価格・在庫情報を入力して次のステップに遷移する', { tag: ['@F-03-05-004', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('単価に "50000" を入力する', null, { page }); 
    await And('単位から "セット" を選択する', null, { page }); 
    await And('最低発注数に "5" を入力する', null, { page }); 
    await And('リードタイムに "14" を入力する', null, { page }); 
    await And('重量に "2.5" を入力する', null, { page }); 
    await And('寸法に "300mm x 200mm x 50mm" を入力する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ3「仕様」が表示される', null, { page }); 
  });

  test('単位の選択肢が8種類表示される', { tag: ['@F-03-05-004', '@正常系'] }, async ({ Then, page }) => { 
    await Then('単位ドロップダウンに選択肢が表示される', null, { page }); 
  });

  test('最低発注数に0以下を入力するとバリデーションエラー', { tag: ['@F-03-05-004', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('最低発注数に "0" を入力する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('最低発注数のバリデーションエラーが表示される', null, { page }); 
  });

  test('リードタイムに0以下を入力するとバリデーションエラー', { tag: ['@F-03-05-004', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('リードタイムに "0" を入力する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('リードタイムのバリデーションエラーが表示される', null, { page }); 
  });

  test('ステップ3から戻った場合に入力値が保持される', { tag: ['@F-03-05-004', '@データ状態'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('価格・在庫情報を入力している', null, { page }); 
    await And('「次へ →」ボタンをクリックしてステップ3に遷移している', null, { page }); 
    await When('「← 前へ」ボタンをクリックする', null, { page }); 
    await Then('ステップ2で入力した値が保持されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-004_price-inventory.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":14,"tags":["@F-03-05-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then 単価が \"\" に設定されている","stepMatchArguments":[{"group":{"start":5,"value":"","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 単位が \"個\" に設定されている","stepMatchArguments":[{"group":{"start":5,"value":"個","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 最低発注数が \"1\" に設定されている","stepMatchArguments":[{"group":{"start":8,"value":"1","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And リードタイムが \"7\" に設定されている","stepMatchArguments":[{"group":{"start":9,"value":"7","children":[]}}]}]},
  {"pwTestLine":19,"pickleLine":21,"tags":["@F-03-05-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When 単価に \"1000\" を入力する","stepMatchArguments":[{"group":{"start":5,"value":"1000","children":[]}}]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then ステップ3「仕様」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"仕様","children":[]}}]}]},
  {"pwTestLine":25,"pickleLine":27,"tags":["@F-03-05-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When 単価に \"50000\" を入力する","stepMatchArguments":[{"group":{"start":5,"value":"50000","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 単位から \"セット\" を選択する","stepMatchArguments":[{"group":{"start":6,"value":"セット","children":[]}}]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And 最低発注数に \"5\" を入力する","stepMatchArguments":[{"group":{"start":8,"value":"5","children":[]}}]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And リードタイムに \"14\" を入力する","stepMatchArguments":[{"group":{"start":9,"value":"14","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"And 重量に \"2.5\" を入力する","stepMatchArguments":[{"group":{"start":5,"value":"2.5","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And 寸法に \"300mm x 200mm x 50mm\" を入力する","stepMatchArguments":[{"group":{"start":5,"value":"300mm x 200mm x 50mm","children":[]}}]},{"pwStepLine":32,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then ステップ3「仕様」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"仕様","children":[]}}]}]},
  {"pwTestLine":36,"pickleLine":38,"tags":["@F-03-05-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then 単位ドロップダウンに選択肢が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":44,"tags":["@F-03-05-004","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When 最低発注数に \"0\" を入力する","stepMatchArguments":[{"group":{"start":8,"value":"0","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then 最低発注数のバリデーションエラーが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":50,"tags":["@F-03-05-004","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When リードタイムに \"0\" を入力する","stepMatchArguments":[{"group":{"start":9,"value":"0","children":[]}}]},{"pwStepLine":48,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then リードタイムのバリデーションエラーが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":58,"tags":["@F-03-05-004","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ2が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given 価格・在庫情報を入力している","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And 「次へ →」ボタンをクリックしてステップ3に遷移している","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When 「← 前へ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then ステップ2で入力した値が保持されている","stepMatchArguments":[]}]},
]; // bdd-data-end