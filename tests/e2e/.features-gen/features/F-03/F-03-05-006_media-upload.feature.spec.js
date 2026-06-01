// Generated from: features/F-03/F-03-05-006_media-upload.feature
import { test } from "playwright-bdd";

test.describe('画像・ドキュメントアップロード（新規登録）', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('製品登録画面でステップ4が表示されている', null, { page }); 
  });
  
  test('画像セクションの初期表示', { tag: ['@F-03-05-006', '@F-03-05-007', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('「製品画像」セクションが表示される', null, { page }); 
    await And('「PNG, JPG形式の画像をアップロードできます」の説明テキストが表示される', null, { page }); 
    await And('「+ 画像を追加」ボタンが表示される', null, { page }); 
  });

  test('画像ファイルを選択するとプレビューが表示される', { tag: ['@F-03-05-006', '@F-03-05-007', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 画像を追加」ボタンをクリックする'); 
    await And('PNG形式の画像ファイルを選択する', null, { page }); 
    await Then('選択した画像のプレビューが表示される', null, { page }); 
  });

  test('ドキュメントセクションの初期表示', { tag: ['@F-03-05-006', '@F-03-05-007', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('「ドキュメント」セクションが表示される', null, { page }); 
    await And('「PDF形式のドキュメントをアップロードできます」の説明テキストが表示される', null, { page }); 
    await And('「+ ドキュメントを追加」ボタンが表示される', null, { page }); 
  });

  test('ドキュメントファイルを選択するとファイル名が表示される', { tag: ['@F-03-05-006', '@F-03-05-007', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ ドキュメントを追加」ボタンをクリックする'); 
    await And('PDF形式のドキュメントファイルを選択する', null, { page }); 
    await Then('選択したドキュメントのファイル名が一覧に表示される', null, { page }); 
  });

  test('画像・ドキュメント未選択のまま次のステップに遷移できる', { tag: ['@F-03-05-006', '@F-03-05-007', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ5「確認」が表示される', null, { page }); 
  });

  test('画像とドキュメントを選択して次のステップに遷移する', { tag: ['@F-03-05-006', '@F-03-05-007', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('PNG形式の画像ファイルを選択している', null, { page }); 
    await And('PDF形式のドキュメントファイルを選択している', null, { page }); 
    await When('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ5「確認」が表示される', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-006_media-upload.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":14,"tags":["@F-03-05-006","@F-03-05-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ4が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then 「製品画像」セクションが表示される","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 「PNG, JPG形式の画像をアップロードできます」の説明テキストが表示される","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 「+ 画像を追加」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":20,"tags":["@F-03-05-006","@F-03-05-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ4が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When 「+ 画像を追加」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And PNG形式の画像ファイルを選択する","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then 選択した画像のプレビューが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":28,"tags":["@F-03-05-006","@F-03-05-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ4が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then 「ドキュメント」セクションが表示される","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And 「PDF形式のドキュメントをアップロードできます」の説明テキストが表示される","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And 「+ ドキュメントを追加」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":34,"tags":["@F-03-05-006","@F-03-05-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ4が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When 「+ ドキュメントを追加」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And PDF形式のドキュメントファイルを選択する","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then 選択したドキュメントのファイル名が一覧に表示される","stepMatchArguments":[]}]},
  {"pwTestLine":36,"pickleLine":42,"tags":["@F-03-05-006","@F-03-05-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ4が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then ステップ5「確認」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"5","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"確認","children":[]}}]}]},
  {"pwTestLine":41,"pickleLine":47,"tags":["@F-03-05-006","@F-03-05-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 製品登録画面でステップ4が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Given PNG形式の画像ファイルを選択している","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"And PDF形式のドキュメントファイルを選択している","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then ステップ5「確認」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"5","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"確認","children":[]}}]}]},
]; // bdd-data-end