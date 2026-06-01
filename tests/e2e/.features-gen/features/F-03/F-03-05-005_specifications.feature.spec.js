// Generated from: features/F-03/F-03-05-005_specifications.feature
import { test } from "playwright-bdd";

test.describe('仕様テーブル入力', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('新規登録ステップ3で初期状態の仕様テーブルが表示される', { tag: ['@F-03-05-005', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('製品登録画面でステップ3が表示されている', null, { page }); 
    await Then('仕様テーブルに1行の空行が表示される', null, { page }); 
    await And('「+ 仕様行を追加」ボタンが表示される', null, { page }); 
    await And('仕様行の×削除ボタンが無効化されている', null, { page }); 
    await And('備考テキストエリアが表示される', null, { page }); 
  });

  test('仕様行を追加する', { tag: ['@F-03-05-005', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面でステップ3が表示されている', null, { page }); 
    await When('「+ 仕様行を追加」ボタンをクリックする', null, { page }); 
    await Then('仕様テーブルに2行表示される', null, { page }); 
    await And('全ての仕様行の×削除ボタンが有効化されている', null, { page }); 
  });

  test('仕様行を削除する', { tag: ['@F-03-05-005', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面でステップ3が表示されている', null, { page }); 
    await And('仕様行が2行以上存在する', null, { page }); 
    await When('2行目の×削除ボタンをクリックする', null, { page }); 
    await Then('仕様テーブルの行数が1減少する', null, { page }); 
  });

  test('仕様と備考を入力して次のステップに遷移する', { tag: ['@F-03-05-005', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面でステップ3が表示されている', null, { page }); 
    await When('1行目の項目名に "CPU" を入力する', null, { page }); 
    await And('1行目の値に "Intel Core i5" を入力する', null, { page }); 
    await And('「+ 仕様行を追加」ボタンをクリックする', null, { page }); 
    await And('2行目の項目名に "メモリ" を入力する', null, { page }); 
    await And('2行目の値に "16GB DDR5" を入力する', null, { page }); 
    await And('備考に "テスト備考" を入力する', null, { page }); 
    await And('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ4「画像・資料」が表示される', null, { page }); 
  });

  test('仕様未入力のまま次のステップに遷移できる', { tag: ['@F-03-05-005', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品登録画面でステップ3が表示されている', null, { page }); 
    await When('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ4「画像・資料」が表示される', null, { page }); 
  });

  test('行が1行のみの場合は削除ボタンが無効化される', { tag: ['@F-03-05-005', '@データ状態'] }, async ({ Given, Then, And, page }) => { 
    await Given('製品登録画面でステップ3が表示されている', null, { page }); 
    await And('仕様テーブルに1行のみ存在する', null, { page }); 
    await Then('仕様行の×削除ボタンが無効化されている', null, { page }); 
  });

  test('編集画面で既存の仕様データがテーブルにプリセットされる', { tag: ['@F-03-05-005', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await Then('仕様テーブルに既存の仕様データが行として表示される', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-005_specifications.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-05-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ3が表示されている","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then 仕様テーブルに1行の空行が表示される","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 「+ 仕様行を追加」ボタンが表示される","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 仕様行の×削除ボタンが無効化されている","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 備考テキストエリアが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":21,"tags":["@F-03-05-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ3が表示されている","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When 「+ 仕様行を追加」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then 仕様テーブルに2行表示される","stepMatchArguments":[{"group":{"start":7,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And 全ての仕様行の×削除ボタンが有効化されている","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":28,"tags":["@F-03-05-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ3が表示されている","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"And 仕様行が2行以上存在する","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When 2行目の×削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":0,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then 仕様テーブルの行数が1減少する","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":35,"tags":["@F-03-05-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ3が表示されている","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When 1行目の項目名に \"CPU\" を入力する","stepMatchArguments":[{"group":{"start":0,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":10,"value":"CPU","children":[]}}]},{"pwStepLine":36,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And 1行目の値に \"Intel Core i5\" を入力する","stepMatchArguments":[{"group":{"start":0,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":8,"value":"Intel Core i5","children":[]}}]},{"pwStepLine":37,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And 「+ 仕様行を追加」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And 2行目の項目名に \"メモリ\" を入力する","stepMatchArguments":[{"group":{"start":0,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":10,"value":"メモリ","children":[]}}]},{"pwStepLine":39,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"And 2行目の値に \"16GB DDR5\" を入力する","stepMatchArguments":[{"group":{"start":0,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":8,"value":"16GB DDR5","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"And 備考に \"テスト備考\" を入力する","stepMatchArguments":[{"group":{"start":5,"value":"テスト備考","children":[]}}]},{"pwStepLine":41,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then ステップ4「画像・資料」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"4","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"画像・資料","children":[]}}]}]},
  {"pwTestLine":45,"pickleLine":47,"tags":["@F-03-05-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ3が表示されている","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then ステップ4「画像・資料」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"4","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"画像・資料","children":[]}}]}]},
  {"pwTestLine":51,"pickleLine":55,"tags":["@F-03-05-005","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ3が表示されている","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"And 仕様テーブルに1行のみ存在する","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then 仕様行の×削除ボタンが無効化されている","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":63,"tags":["@F-03-05-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":59,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then 仕様テーブルに既存の仕様データが行として表示される","stepMatchArguments":[]}]},
]; // bdd-data-end