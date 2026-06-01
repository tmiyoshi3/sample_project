// Generated from: features/F-03/F-03-05-002_basic-info.feature
import { test } from "playwright-bdd";

test.describe('基本情報入力・SKU重複チェック', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('製品登録画面にアクセスしている', null, { page }); 
  });
  
  test('基本情報の全項目を入力して次のステップに遷移する', { tag: ['@F-03-05-002', '@F-03-05-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品名に "テスト製品A" を入力する', null, { page }); 
    await And('SKUに "ZZ-99999" を入力する', null, { page }); 
    await And('説明に "テスト用の製品説明" を入力する', null, { page }); 
    await And('カテゴリから "デスクトップPC" を選択する', null, { page }); 
    await And('メーカーから "Dell Technologies" を選択する', null, { page }); 
    await And('ステータスが "有効" であることを確認する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ2「価格・在庫」が表示される', null, { page }); 
  });

  test('カテゴリドロップダウンにAPIから取得した選択肢が表示される', { tag: ['@F-03-05-002', '@F-03-05-003', '@正常系'] }, async ({ Then, page }) => { 
    await Then('カテゴリドロップダウンに選択肢が表示される', null, { page }); 
  });

  test('メーカードロップダウンにAPIから取得した選択肢が表示される', { tag: ['@F-03-05-002', '@F-03-05-003', '@正常系'] }, async ({ Then, page }) => { 
    await Then('メーカードロップダウンに選択肢が表示される', null, { page }); 
  });

  test('ステータスのデフォルト値が有効である', { tag: ['@F-03-05-002', '@F-03-05-003', '@正常系'] }, async ({ Then, page }) => { 
    await Then('ステータスが "有効" に設定されている', null, { page }); 
  });

  test('利用可能なSKUを入力するとチェックマークが表示される', { tag: ['@F-03-05-002', '@F-03-05-003', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('SKUに "ZZ-99999" を入力する', null, { page }); 
    await Then('SKU重複チェックインジケーターに「✓」が表示される', null, { page }); 
  });

  test('必須項目のみ入力して次のステップに遷移できる', { tag: ['@F-03-05-002', '@F-03-05-003', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品名に "最小入力テスト" を入力する', null, { page }); 
    await And('SKUに "TEST-88888" を入力する', null, { page }); 
    await And('カテゴリから "デスクトップPC" を選択する', null, { page }); 
    await And('メーカーから "Dell Technologies" を選択する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ2「価格・在庫」が表示される', null, { page }); 
  });

  test.describe('必須項目未入力でバリデーションエラーが表示される', () => {

    test('Example #1', { tag: ['@F-03-05-002', '@F-03-05-003', '@バリデーション'] }, async ({ When, Then, page }) => { 
      await When('「次へ →」ボタンをクリックする', null, { page }); 
      await Then('"製品名は必須です" が表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-05-002', '@F-03-05-003', '@バリデーション'] }, async ({ When, Then, page }) => { 
      await When('「次へ →」ボタンをクリックする', null, { page }); 
      await Then('"SKUは必須です" が表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-05-002', '@F-03-05-003', '@バリデーション'] }, async ({ When, Then, page }) => { 
      await When('「次へ →」ボタンをクリックする', null, { page }); 
      await Then('"カテゴリを選択してください" が表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-05-002', '@F-03-05-003', '@バリデーション'] }, async ({ When, Then, page }) => { 
      await When('「次へ →」ボタンをクリックする', null, { page }); 
      await Then('"メーカーを選択してください" が表示される', null, { page }); 
    });

  });

  test('重複するSKUを入力すると重複エラーが表示される', { tag: ['@F-03-05-002', '@F-03-05-003', '@バリデーション'] }, async ({ When, Then, page }) => { 
    await When('SKUに "DPC-001001" を入力する', null, { page }); 
    await Then('SKU重複エラーメッセージが表示される', null, { page }); 
  });

  test('ステップ2から戻った場合に入力値が保持される', { tag: ['@F-03-05-002', '@F-03-05-003', '@データ状態'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ステップ1の必須項目を入力している', null, { page }); 
    await And('「次へ →」ボタンをクリックしてステップ2に遷移している', null, { page }); 
    await When('「← 前へ」ボタンをクリックする', null, { page }); 
    await Then('ステップ1で入力した値が保持されている', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-002_basic-info.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":14,"tags":["@F-03-05-002","@F-03-05-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 製品名に \"テスト製品A\" を入力する","stepMatchArguments":[{"group":{"start":6,"value":"テスト製品A","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And SKUに \"ZZ-99999\" を入力する","stepMatchArguments":[{"group":{"start":6,"value":"ZZ-99999","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And 説明に \"テスト用の製品説明\" を入力する","stepMatchArguments":[{"group":{"start":5,"value":"テスト用の製品説明","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And カテゴリから \"デスクトップPC\" を選択する","stepMatchArguments":[{"group":{"start":8,"value":"デスクトップPC","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And メーカーから \"Dell Technologies\" を選択する","stepMatchArguments":[{"group":{"start":8,"value":"Dell Technologies","children":[]}}]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And ステータスが \"有効\" であることを確認する","stepMatchArguments":[{"group":{"start":8,"value":"有効","children":[]}}]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then ステップ2「価格・在庫」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"価格・在庫","children":[]}}]}]},
  {"pwTestLine":23,"pickleLine":25,"tags":["@F-03-05-002","@F-03-05-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then カテゴリドロップダウンに選択肢が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":29,"tags":["@F-03-05-002","@F-03-05-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then メーカードロップダウンに選択肢が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":33,"tags":["@F-03-05-002","@F-03-05-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then ステータスが \"有効\" に設定されている","stepMatchArguments":[{"group":{"start":8,"value":"有効","children":[]}}]}]},
  {"pwTestLine":35,"pickleLine":37,"tags":["@F-03-05-002","@F-03-05-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When SKUに \"ZZ-99999\" を入力する","stepMatchArguments":[{"group":{"start":6,"value":"ZZ-99999","children":[]}}]},{"pwStepLine":37,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then SKU重複チェックインジケーターに「✓」が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":42,"tags":["@F-03-05-002","@F-03-05-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When 製品名に \"最小入力テスト\" を入力する","stepMatchArguments":[{"group":{"start":6,"value":"最小入力テスト","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And SKUに \"TEST-88888\" を入力する","stepMatchArguments":[{"group":{"start":6,"value":"TEST-88888","children":[]}}]},{"pwStepLine":43,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And カテゴリから \"デスクトップPC\" を選択する","stepMatchArguments":[{"group":{"start":8,"value":"デスクトップPC","children":[]}}]},{"pwStepLine":44,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And メーカーから \"Dell Technologies\" を選択する","stepMatchArguments":[{"group":{"start":8,"value":"Dell Technologies","children":[]}}]},{"pwStepLine":45,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then ステップ2「価格・在庫」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"価格・在庫","children":[]}}]}]},
  {"pwTestLine":51,"pickleLine":59,"tags":["@F-03-05-002","@F-03-05-003","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then \"製品名は必須です\" が表示される","stepMatchArguments":[{"group":{"start":1,"value":"製品名は必須です","children":[]}}]}]},
  {"pwTestLine":56,"pickleLine":60,"tags":["@F-03-05-002","@F-03-05-003","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then \"SKUは必須です\" が表示される","stepMatchArguments":[{"group":{"start":1,"value":"SKUは必須です","children":[]}}]}]},
  {"pwTestLine":61,"pickleLine":61,"tags":["@F-03-05-002","@F-03-05-003","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then \"カテゴリを選択してください\" が表示される","stepMatchArguments":[{"group":{"start":1,"value":"カテゴリを選択してください","children":[]}}]}]},
  {"pwTestLine":66,"pickleLine":62,"tags":["@F-03-05-002","@F-03-05-003","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then \"メーカーを選択してください\" が表示される","stepMatchArguments":[{"group":{"start":1,"value":"メーカーを選択してください","children":[]}}]}]},
  {"pwTestLine":73,"pickleLine":65,"tags":["@F-03-05-002","@F-03-05-003","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When SKUに \"DPC-001001\" を入力する","stepMatchArguments":[{"group":{"start":6,"value":"DPC-001001","children":[]}}]},{"pwStepLine":75,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then SKU重複エラーメッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":78,"pickleLine":72,"tags":["@F-03-05-002","@F-03-05-003","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面にアクセスしている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given ステップ1の必須項目を入力している","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"And 「次へ →」ボタンをクリックしてステップ2に遷移している","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When 「← 前へ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then ステップ1で入力した値が保持されている","stepMatchArguments":[]}]},
]; // bdd-data-end