// Generated from: features/F-03/F-03-01-010_csv-export.feature
import { test } from "playwright-bdd";

test.describe('製品カタログCSVエクスポート', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('製品一覧画面が表示されている', null, { page }); 
  });
  
  test('CSV出力ボタンクリックでCSVファイルがダウンロードされる', { tag: ['@F-03-01-010', '@UC-009', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('CSV出力ボタンをクリックする', null, { page }); 
    await Then('"products_" で始まるCSVファイルがダウンロードされる', null, { page }); 
  });

  test('CSVファイル名にダウンロード日が含まれる', { tag: ['@F-03-01-010', '@UC-009', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('CSV出力ボタンをクリックする', null, { page }); 
    await Then('ダウンロードされたCSVファイル名が "products_YYYY-MM-DD.csv" 形式である', null, { page }); 
  });

  test('CSVヘッダに6項目が含まれる', { tag: ['@F-03-01-010', '@UC-009', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('CSV出力ボタンをクリックする', null, { page }); 
    await Then('ダウンロードされたCSVのヘッダ行に "SKU" が含まれている', null, { page }); 
    await And('ダウンロードされたCSVのヘッダ行に "製品名" が含まれている', null, { page }); 
    await And('ダウンロードされたCSVのヘッダ行に "カテゴリ" が含まれている', null, { page }); 
    await And('ダウンロードされたCSVのヘッダ行に "メーカー" が含まれている', null, { page }); 
    await And('ダウンロードされたCSVのヘッダ行に "単価" が含まれている', null, { page }); 
    await And('ダウンロードされたCSVのヘッダ行に "ステータス" が含まれている', null, { page }); 
  });

  test('CSVにデータ行が含まれる', { tag: ['@F-03-01-010', '@UC-009', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('CSV出力ボタンをクリックする', null, { page }); 
    await Then('ダウンロードされたCSVにデータ行が1件以上含まれている', null, { page }); 
  });

  test('フィルタ適用中でもCSVには全件出力される', { tag: ['@F-03-01-010', '@UC-009', '@データ状態'] }, async ({ Given, When, Then, page }) => { 
    await Given('カテゴリフィルタで "ノートPC" を選択している', null, { page }); 
    await When('CSV出力ボタンをクリックする', null, { page }); 
    await Then('ダウンロードされたCSVにフィルタ適用前と同じ件数のデータ行が含まれている', null, { page }); 
  });

  test.describe('全ロールのユーザーがCSV出力できる', () => {

    test('Example #1', { tag: ['@F-03-01-010', '@UC-009', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('製品一覧画面が表示されている', null, { page }); 
      await When('CSV出力ボタンをクリックする', null, { page }); 
      await Then('CSVファイルがダウンロードされる', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-01-010', '@UC-009', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('製品一覧画面が表示されている', null, { page }); 
      await When('CSV出力ボタンをクリックする', null, { page }); 
      await Then('CSVファイルがダウンロードされる', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-01-010', '@UC-009', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('製品一覧画面が表示されている', null, { page }); 
      await When('CSV出力ボタンをクリックする', null, { page }); 
      await Then('CSVファイルがダウンロードされる', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-01-010', '@UC-009', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('製品一覧画面が表示されている', null, { page }); 
      await When('CSV出力ボタンをクリックする', null, { page }); 
      await Then('CSVファイルがダウンロードされる', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-01-010', '@UC-009', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('製品一覧画面が表示されている', null, { page }); 
      await When('CSV出力ボタンをクリックする', null, { page }); 
      await Then('CSVファイルがダウンロードされる', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-01-010_csv-export.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":["@F-03-01-010","@UC-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then \"products_\" で始まるCSVファイルがダウンロードされる","stepMatchArguments":[{"group":{"start":0,"value":"\"products_\"","children":[{"start":1,"value":"products_","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":18,"tags":["@F-03-01-010","@UC-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then ダウンロードされたCSVファイル名が \"products_YYYY-MM-DD.csv\" 形式である","stepMatchArguments":[{"group":{"start":19,"value":"\"products_YYYY-MM-DD.csv\"","children":[{"start":20,"value":"products_YYYY-MM-DD.csv","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":23,"tags":["@F-03-01-010","@UC-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then ダウンロードされたCSVのヘッダ行に \"SKU\" が含まれている","stepMatchArguments":[{"group":{"start":19,"value":"\"SKU\"","children":[{"start":20,"value":"SKU","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And ダウンロードされたCSVのヘッダ行に \"製品名\" が含まれている","stepMatchArguments":[{"group":{"start":19,"value":"\"製品名\"","children":[{"start":20,"value":"製品名","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And ダウンロードされたCSVのヘッダ行に \"カテゴリ\" が含まれている","stepMatchArguments":[{"group":{"start":19,"value":"\"カテゴリ\"","children":[{"start":20,"value":"カテゴリ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And ダウンロードされたCSVのヘッダ行に \"メーカー\" が含まれている","stepMatchArguments":[{"group":{"start":19,"value":"\"メーカー\"","children":[{"start":20,"value":"メーカー","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And ダウンロードされたCSVのヘッダ行に \"単価\" が含まれている","stepMatchArguments":[{"group":{"start":19,"value":"\"単価\"","children":[{"start":20,"value":"単価","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And ダウンロードされたCSVのヘッダ行に \"ステータス\" が含まれている","stepMatchArguments":[{"group":{"start":19,"value":"\"ステータス\"","children":[{"start":20,"value":"ステータス","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":32,"pickleLine":33,"tags":["@F-03-01-010","@UC-009","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then ダウンロードされたCSVにデータ行が1件以上含まれている","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":41,"tags":["@F-03-01-010","@UC-009","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"Given カテゴリフィルタで \"ノートPC\" を選択している","stepMatchArguments":[{"group":{"start":10,"value":"\"ノートPC\"","children":[{"start":11,"value":"ノートPC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then ダウンロードされたCSVにフィルタ適用前と同じ件数のデータ行が含まれている","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":57,"tags":["@F-03-01-010","@UC-009","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then CSVファイルがダウンロードされる","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":58,"tags":["@F-03-01-010","@UC-009","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then CSVファイルがダウンロードされる","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":59,"tags":["@F-03-01-010","@UC-009","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then CSVファイルがダウンロードされる","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":60,"tags":["@F-03-01-010","@UC-009","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then CSVファイルがダウンロードされる","stepMatchArguments":[]}]},
  {"pwTestLine":73,"pickleLine":61,"tags":["@F-03-01-010","@UC-009","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And 製品一覧画面が表示されている","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When CSV出力ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then CSVファイルがダウンロードされる","stepMatchArguments":[]}]},
]; // bdd-data-end