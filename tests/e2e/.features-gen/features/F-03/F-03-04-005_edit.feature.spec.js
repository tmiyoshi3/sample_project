// Generated from: features/F-03/F-03-04-005_edit.feature
import { test } from "playwright-bdd";

test.describe('バンドル編集', () => {

  test.beforeEach('Background', async ({ Given, And, page, request }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('テスト用バンドル「TEST-BDL-EDIT」が作成されている', null, { request }); 
    await And('バンドル管理画面を表示する', null, { page }); 
  });
  
  test('編集ボタンクリックで既存値がプリセットされたフォームが表示される', { tag: ['@F-03-04-005', '@F-03-04-003', '@F-03-04-004', '@F-03-04-007', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする', null, { page }); 
    await Then('「バンドル編集」フォームが表示される', null, { page }); 
    await And('バンドル名に「TEST-BDL-EDIT」がプリセットされている', null, { page }); 
    await And('構成製品テーブルに既存の構成製品が表示されている', null, { page }); 
    await And('価格計算エリアが表示されている', null, { page }); 
    await And('バンドル一覧が非表示である', null, { page }); 
  });

  test('バンドルを更新できる', { tag: ['@F-03-04-005', '@F-03-04-003', '@F-03-04-004', '@F-03-04-007', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする', null, { page }); 
    await And('バンドル名を「TEST-BDL-EDIT-UPDATED」に変更する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「バンドルを更新しました。」が表示される', null, { page }); 
    await And('バンドル一覧に「TEST-BDL-EDIT-UPDATED」が表示されている', null, { page }); 
  });

  test('編集時にステータスを変更できる', { tag: ['@F-03-04-005', '@F-03-04-003', '@F-03-04-004', '@F-03-04-007', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする', null, { page }); 
    await And('ステータスを「無効」に変更する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「バンドルを更新しました。」が表示される', null, { page }); 
    await And('バンドルカード「TEST-BDL-EDIT」にステータスバッジ「無効」が表示されている', null, { page }); 
  });

  test('編集をキャンセルするとフォームが閉じる', { tag: ['@F-03-04-005', '@F-03-04-003', '@F-03-04-004', '@F-03-04-007', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする', null, { page }); 
    await And('バンドル名を「キャンセルテスト」に変更する', null, { page }); 
    await And('「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('編集フォームが閉じている', null, { page }); 
    await And('バンドル一覧が表示されている', null, { page }); 
    await And('バンドルカード「TEST-BDL-EDIT」が表示されている', null, { page }); 
  });

  test('編集時に構成製品を追加できる', { tag: ['@F-03-04-005', '@F-03-04-003', '@F-03-04-004', '@F-03-04-007', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「バンドルを更新しました。」が表示される', null, { page }); 
  });

  test('編集時に構成製品を削除できる', { tag: ['@F-03-04-005', '@F-03-04-003', '@F-03-04-004', '@F-03-04-007', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする', null, { page }); 
    await And('構成製品テーブルの1行目の削除ボタンをクリックする', null, { page }); 
    await And('製品検索欄で別の製品を検索して追加する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「バンドルを更新しました。」が表示される', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-04-005_edit.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":13,"pickleLine":16,"tags":["@F-03-04-005","@F-03-04-003","@F-03-04-004","@F-03-04-007","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And テスト用バンドル「TEST-BDL-EDIT」が作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then 「バンドル編集」フォームが表示される","stepMatchArguments":[{"group":{"start":1,"value":"バンドル編集","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And バンドル名に「TEST-BDL-EDIT」がプリセットされている","stepMatchArguments":[{"group":{"start":7,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 構成製品テーブルに既存の構成製品が表示されている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 価格計算エリアが表示されている","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧が非表示である","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":25,"tags":["@F-03-04-005","@F-03-04-003","@F-03-04-004","@F-03-04-007","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And テスト用バンドル「TEST-BDL-EDIT」が作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And バンドル名を「TEST-BDL-EDIT-UPDATED」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-BDL-EDIT-UPDATED","children":[]}}]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「バンドルを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"バンドルを更新しました。","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧に「TEST-BDL-EDIT-UPDATED」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT-UPDATED","children":[]}}]}]},
  {"pwTestLine":30,"pickleLine":33,"tags":["@F-03-04-005","@F-03-04-003","@F-03-04-004","@F-03-04-007","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And テスト用バンドル「TEST-BDL-EDIT」が作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And ステータスを「無効」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"無効","children":[]}}]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「バンドルを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"バンドルを更新しました。","children":[]}}]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And バンドルカード「TEST-BDL-EDIT」にステータスバッジ「無効」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}},{"group":{"start":32,"value":"無効","children":[]}}]}]},
  {"pwTestLine":38,"pickleLine":41,"tags":["@F-03-04-005","@F-03-04-003","@F-03-04-004","@F-03-04-007","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And テスト用バンドル「TEST-BDL-EDIT」が作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And バンドル名を「キャンセルテスト」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"キャンセルテスト","children":[]}}]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And 「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then 編集フォームが閉じている","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧が表示されている","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And バンドルカード「TEST-BDL-EDIT」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]}]},
  {"pwTestLine":47,"pickleLine":50,"tags":["@F-03-04-005","@F-03-04-003","@F-03-04-004","@F-03-04-007","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And テスト用バンドル「TEST-BDL-EDIT」が作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":49,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「バンドルを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"バンドルを更新しました。","children":[]}}]}]},
  {"pwTestLine":54,"pickleLine":57,"tags":["@F-03-04-005","@F-03-04-003","@F-03-04-004","@F-03-04-007","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And テスト用バンドル「TEST-BDL-EDIT」が作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-EDIT」の「編集」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-EDIT","children":[]}}]},{"pwStepLine":56,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"And 構成製品テーブルの1行目の削除ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"And 製品検索欄で別の製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「バンドルを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"バンドルを更新しました。","children":[]}}]}]},
]; // bdd-data-end