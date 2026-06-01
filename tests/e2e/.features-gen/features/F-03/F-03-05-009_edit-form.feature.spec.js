// Generated from: features/F-03/F-03-05-009_edit-form.feature
import { test } from "playwright-bdd";

test.describe('編集フォーム・画像管理・ドキュメント管理', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('編集画面に既存データがプリセットされる', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の編集画面にアクセスする', null, { page }); 
    await Then('ページタイトル「製品編集」が表示される', null, { page }); 
    await And('製品名に既存値がプリセットされている', null, { page }); 
    await And('SKUに既存値がプリセットされている', null, { page }); 
    await And('カテゴリに既存値が選択されている', null, { page }); 
    await And('メーカーに既存値が選択されている', null, { page }); 
    await And('ステータスに既存値が選択されている', null, { page }); 
    await And('単価に既存値がプリセットされている', null, { page }); 
    await And('備考に既存値がプリセットされている', null, { page }); 
  });

  test('編集画面ではステータスに廃番を含む4択が表示される', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "1" の編集画面にアクセスする', null, { page }); 
    await Then('ステータスドロップダウンに4つの選択肢が表示される', null, { page }); 
  });

  test('編集画面で全セクションが1ページに表示される', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の編集画面にアクセスする', null, { page }); 
    await Then('基本情報セクションが表示される', null, { page }); 
    await And('価格・在庫セクションが表示される', null, { page }); 
    await And('仕様セクションが表示される', null, { page }); 
    await And('備考セクションが表示される', null, { page }); 
    await And('製品画像セクションが表示される', null, { page }); 
    await And('ドキュメントセクションが表示される', null, { page }); 
    await And('「更新する」ボタンが表示される', null, { page }); 
    await And('「キャンセル」ボタンが表示される', null, { page }); 
  });

  test('編集画面でSKU変更時に重複チェックが実行される', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await When('SKUの値を変更する', null, { page }); 
    await Then('SKU重複チェック結果が表示される', null, { page }); 
  });

  test('キャンセルボタンで製品詳細に戻る', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await When('製品フォームの「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('製品詳細画面が表示される', null, { page }); 
  });

  test('編集画面で既存画像がサムネイル表示される', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await Then('既存画像がサムネイルで表示される', null, { page }); 
    await And('各画像に「削除」ボタンが表示される', null, { page }); 
    await And('「+ 画像を追加」ボタンが表示される', null, { page }); 
  });

  test('編集画面で画像を追加する', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await When('「+ 画像を追加」ボタンをクリックする'); 
    await And('PNG形式の画像ファイルを選択する', null, { page }); 
    await Then('追加した画像がサムネイル一覧に表示される', null, { page }); 
  });

  test('編集画面で画像を削除する', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await And('既存画像が表示されている', null, { page }); 
    await When('画像の「削除」ボタンをクリックする', null, { page }); 
    await Then('画像がサムネイル一覧から削除される', null, { page }); 
  });

  test('編集画面で既存ドキュメントがリンク表示される', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await Then('既存ドキュメントがリンク形式で表示される', null, { page }); 
    await And('各ドキュメントに「削除」ボタンが表示される', null, { page }); 
    await And('「+ ドキュメントを追加」ボタンが表示される', null, { page }); 
  });

  test('編集画面でドキュメントを追加する', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await When('ドキュメントタイプから "仕様書" を選択する', null, { page }); 
    await And('「+ ドキュメントを追加」ボタンをクリックする'); 
    await And('PDF形式のドキュメントファイルを選択する', null, { page }); 
    await Then('追加したドキュメントが一覧に表示される', null, { page }); 
  });

  test('編集画面でドキュメントを削除する', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の編集画面にアクセスしている', null, { page }); 
    await And('既存ドキュメントが表示されている', null, { page }); 
    await When('ドキュメントの「削除」ボタンをクリックする', null, { page }); 
    await Then('ドキュメントが一覧から削除される', null, { page }); 
  });

  test('存在しない製品IDの編集画面にアクセスするとエラーが表示される', { tag: ['@F-03-05-009', '@F-03-05-010', '@F-03-05-011', '@エラー'] }, async ({ When, Then, page }) => { 
    await When('存在しない製品IDで編集画面にアクセスする', null, { page }); 
    await Then('製品データ取得エラーが表示される', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-009_edit-form.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の編集画面にアクセスする","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品編集」が表示される","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 製品名に既存値がプリセットされている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And SKUに既存値がプリセットされている","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And カテゴリに既存値が選択されている","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And メーカーに既存値が選択されている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And ステータスに既存値が選択されている","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 単価に既存値がプリセットされている","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 備考に既存値がプリセットされている","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":25,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の編集画面にアクセスする","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":25,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then ステータスドロップダウンに4つの選択肢が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":30,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の編集画面にアクセスする","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then 基本情報セクションが表示される","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And 価格・在庫セクションが表示される","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And 仕様セクションが表示される","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And 備考セクションが表示される","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And 製品画像セクションが表示される","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And ドキュメントセクションが表示される","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And 「更新する」ボタンが表示される","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And 「キャンセル」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":42,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When SKUの値を変更する","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then SKU重複チェック結果が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":48,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":48,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When 製品フォームの「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then 製品詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":56,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":54,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then 既存画像がサムネイルで表示される","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And 各画像に「削除」ボタンが表示される","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"And 「+ 画像を追加」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":63,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":61,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When 「+ 画像を追加」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And PNG形式の画像ファイルを選択する","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 追加した画像がサムネイル一覧に表示される","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":70,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":71,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":68,"gherkinStepLine":72,"keywordType":"Context","textWithKeyword":"And 既存画像が表示されている","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When 画像の「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"Then 画像がサムネイル一覧から削除される","stepMatchArguments":[]}]},
  {"pwTestLine":73,"pickleLine":79,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":75,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then 既存ドキュメントがリンク形式で表示される","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And 各ドキュメントに「削除」ボタンが表示される","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"And 「+ ドキュメントを追加」ボタンが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":86,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":87,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":82,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"When ドキュメントタイプから \"仕様書\" を選択する","stepMatchArguments":[{"group":{"start":13,"value":"仕様書","children":[]}}]},{"pwStepLine":83,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"And 「+ ドキュメントを追加」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"And PDF形式のドキュメントファイルを選択する","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then 追加したドキュメントが一覧に表示される","stepMatchArguments":[]}]},
  {"pwTestLine":88,"pickleLine":94,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の編集画面にアクセスしている","stepMatchArguments":[{"group":{"start":6,"value":"1","children":[]}}]},{"pwStepLine":90,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"And 既存ドキュメントが表示されている","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When ドキュメントの「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":98,"keywordType":"Outcome","textWithKeyword":"Then ドキュメントが一覧から削除される","stepMatchArguments":[]}]},
  {"pwTestLine":95,"pickleLine":103,"tags":["@F-03-05-009","@F-03-05-010","@F-03-05-011","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":104,"keywordType":"Action","textWithKeyword":"When 存在しない製品IDで編集画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":105,"keywordType":"Outcome","textWithKeyword":"Then 製品データ取得エラーが表示される","stepMatchArguments":[]}]},
]; // bdd-data-end