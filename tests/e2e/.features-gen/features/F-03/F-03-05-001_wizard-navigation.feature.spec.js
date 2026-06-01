// Generated from: features/F-03/F-03-05-001_wizard-navigation.feature
import { test } from "playwright-bdd";

test.describe('ウィザードナビゲーション', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('ウィザード初期表示でステップ1が表示される', { tag: ['@F-03-05-001', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品登録画面にアクセスする', null, { page }); 
    await Then('ページタイトル「製品登録」が表示される', null, { page }); 
    await And('ステップインジケーターが5つ表示される', null, { page }); 
    await And('ステップ1「基本情報」がアクティブ状態である', null, { page }); 
    await And('「← 前へ」ボタンが非表示である', null, { page }); 
    await And('「次へ →」ボタンが表示される', null, { page }); 
    await And('「キャンセル」ボタンが表示される', null, { page }); 
  });

  test('ステップ1からステップ2に遷移する', { tag: ['@F-03-05-001', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面にアクセスしている', null, { page }); 
    await And('ステップ1の必須項目を入力している', null, { page }); 
    await When('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ2「価格・在庫」が表示される', null, { page }); 
    await And('ステップ1にチェックマーク（✓）が表示される', null, { page }); 
    await And('「← 前へ」ボタンが表示される', null, { page }); 
    await And('「次へ →」ボタンが表示される', null, { page }); 
  });

  test('ステップ2からステップ1に戻る', { tag: ['@F-03-05-001', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面でステップ2が表示されている', null, { page }); 
    await When('「← 前へ」ボタンをクリックする', null, { page }); 
    await Then('ステップ1「基本情報」が表示される', null, { page }); 
    await And('ステップ1で入力した値が保持されている', null, { page }); 
  });

  test('ステップ5まで遷移すると登録するボタンが表示される', { tag: ['@F-03-05-001', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面でステップ4まで入力が完了している', null, { page }); 
    await When('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ5「確認」が表示される', null, { page }); 
    await And('「次へ →」ボタンが非表示である', null, { page }); 
    await And('「登録する」ボタンが表示される', null, { page }); 
  });

  test('キャンセルボタンで製品一覧に戻る', { tag: ['@F-03-05-001', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品登録画面にアクセスしている', null, { page }); 
    await When('製品フォームの「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('製品一覧画面が表示される', null, { page }); 
  });

  test('ステップ1の必須項目未入力で次へ遷移できない', { tag: ['@F-03-05-001', '@バリデーション'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品登録画面にアクセスしている', null, { page }); 
    await And('ステップ1の必須項目を入力していない'); 
    await When('「次へ →」ボタンをクリックする', null, { page }); 
    await Then('ステップ1のまま遷移しない', null, { page }); 
    await And('バリデーションエラーメッセージが表示される', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-001_wizard-navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-05-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When 製品登録画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品登録」が表示される","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And ステップインジケーターが5つ表示される","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And ステップ1「基本情報」がアクティブ状態である","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 「← 前へ」ボタンが非表示である","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And 「次へ →」ボタンが表示される","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 「キャンセル」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":23,"tags":["@F-03-05-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given 製品登録画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"And ステップ1の必須項目を入力している","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then ステップ2「価格・在庫」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"価格・在庫","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And ステップ1にチェックマーク（✓）が表示される","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And 「← 前へ」ボタンが表示される","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And 「次へ →」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":33,"tags":["@F-03-05-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ2が表示されている","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When 「← 前へ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then ステップ1「基本情報」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"基本情報","children":[]}}]},{"pwStepLine":35,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And ステップ1で入力した値が保持されている","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":40,"tags":["@F-03-05-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given 製品登録画面でステップ4まで入力が完了している","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then ステップ5「確認」が表示される","stepMatchArguments":[{"group":{"start":4,"value":"5","children":[]},"parameterTypeName":"int"},{"group":{"start":6,"value":"確認","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And 「次へ →」ボタンが非表示である","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And 「登録する」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":48,"tags":["@F-03-05-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"Given 製品登録画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When 製品フォームの「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then 製品一覧画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":56,"tags":["@F-03-05-001","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Given 製品登録画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"And ステップ1の必須項目を入力していない","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When 「次へ →」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then ステップ1のまま遷移しない","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And バリデーションエラーメッセージが表示される","stepMatchArguments":[]}]},
]; // bdd-data-end