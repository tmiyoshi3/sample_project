// Generated from: features/F-03/F-03-02-001_product-header.feature
import { test } from "playwright-bdd";

test.describe('製品ヘッダ情報の表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('ACTIVE製品のヘッダ情報が正しく表示される', { tag: ['@F-03-02-001', '@UC-010', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('ページタイトル「製品詳細」が表示されている', null, { page }); 
    await And('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
    await And('ステータスバッジ「有効」が表示されている', null, { page }); 
    await And('SKU「DPC-001001」が表示されている', null, { page }); 
    await And('カテゴリ「デスクトップPC」が表示されている', null, { page }); 
    await And('メーカー「Dell Technologies」が表示されている', null, { page }); 
  });

  test('INACTIVE製品のステータスバッジが「無効」と表示される', { tag: ['@F-03-02-001', '@UC-010', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "5" の製品詳細画面にアクセスする', null, { page }); 
    await Then('ステータスバッジ「無効」が表示されている', null, { page }); 
  });

  test('DISCONTINUED製品のステータスバッジが「販売終了」と表示される', { tag: ['@F-03-02-001', '@UC-010', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "15" の製品詳細画面にアクセスする', null, { page }); 
    await Then('ステータスバッジ「販売終了」が表示されている', null, { page }); 
  });

  test('タブを切り替えてもヘッダ情報は常時表示される', { tag: ['@F-03-02-001', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「仕様」タブをクリックする', null, { page }); 
    await Then('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
    await And('ステータスバッジ「有効」が表示されている', null, { page }); 
    await And('SKU「DPC-001001」が表示されている', null, { page }); 
  });

  test('存在しない製品IDにアクセスするとエラーバナーが表示される', { tag: ['@F-03-02-001', '@UC-010', '@エラー'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "99999" の製品詳細画面にアクセスする', null, { page }); 
    await Then('エラーバナー「製品情報の取得に失敗しました。」が表示される', null, { page }); 
    await And('「一覧に戻る」ボタンが表示されている', null, { page }); 
  });

  test.describe('全ロールのユーザーが製品ヘッダ情報を閲覧できる', () => {

    test('Example #1', { tag: ['@F-03-02-001', '@UC-010', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
      await Then('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
      await And('ステータスバッジ「有効」が表示されている', null, { page }); 
      await And('SKU「DPC-001001」が表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-02-001', '@UC-010', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
      await Then('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
      await And('ステータスバッジ「有効」が表示されている', null, { page }); 
      await And('SKU「DPC-001001」が表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-02-001', '@UC-010', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
      await Then('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
      await And('ステータスバッジ「有効」が表示されている', null, { page }); 
      await And('SKU「DPC-001001」が表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-02-001', '@UC-010', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
      await Then('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
      await And('ステータスバッジ「有効」が表示されている', null, { page }); 
      await And('SKU「DPC-001001」が表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-02-001', '@UC-010', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
      await Then('製品名「Dell OptiPlex 7010 SFF」が表示されている', null, { page }); 
      await And('ステータスバッジ「有効」が表示されている', null, { page }); 
      await And('SKU「DPC-001001」が表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-001_product-header.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-001","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品詳細」が表示されている","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And カテゴリ「デスクトップPC」が表示されている","stepMatchArguments":[{"group":{"start":5,"value":"デスクトップPC","children":[]}}]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And メーカー「Dell Technologies」が表示されている","stepMatchArguments":[{"group":{"start":5,"value":"Dell Technologies","children":[]}}]}]},
  {"pwTestLine":21,"pickleLine":23,"tags":["@F-03-02-001","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When 製品ID \"5\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"5\"","children":[{"start":6,"value":"5","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then ステータスバッジ「無効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"無効","children":[]}}]}]},
  {"pwTestLine":26,"pickleLine":28,"tags":["@F-03-02-001","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When 製品ID \"15\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"15\"","children":[{"start":6,"value":"15","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then ステータスバッジ「販売終了」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"販売終了","children":[]}}]}]},
  {"pwTestLine":31,"pickleLine":34,"tags":["@F-03-02-001","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When 「仕様」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"仕様","children":[]}}]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]}]},
  {"pwTestLine":39,"pickleLine":44,"tags":["@F-03-02-001","@UC-010","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When 製品ID \"99999\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"99999\"","children":[{"start":6,"value":"99999","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then エラーバナー「製品情報の取得に失敗しました。」が表示される","stepMatchArguments":[{"group":{"start":7,"value":"製品情報の取得に失敗しました。","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And 「一覧に戻る」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":47,"pickleLine":61,"tags":["@F-03-02-001","@UC-010","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":49,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":50,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":51,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":52,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]}]},
  {"pwTestLine":55,"pickleLine":62,"tags":["@F-03-02-001","@UC-010","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":59,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":60,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]}]},
  {"pwTestLine":63,"pickleLine":63,"tags":["@F-03-02-001","@UC-010","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":67,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":68,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]}]},
  {"pwTestLine":71,"pickleLine":64,"tags":["@F-03-02-001","@UC-010","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":73,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":75,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":76,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]}]},
  {"pwTestLine":79,"pickleLine":65,"tags":["@F-03-02-001","@UC-010","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":82,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 製品名「Dell OptiPlex 7010 SFF」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":83,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And ステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"有効","children":[]}}]},{"pwStepLine":84,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And SKU「DPC-001001」が表示されている","stepMatchArguments":[{"group":{"start":4,"value":"DPC-001001","children":[]}}]}]},
]; // bdd-data-end