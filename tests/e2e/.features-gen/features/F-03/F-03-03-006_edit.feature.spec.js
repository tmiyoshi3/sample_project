// Generated from: features/F-03/F-03-03-006_edit.feature
import { test } from "playwright-bdd";

test.describe('カテゴリ編集', () => {

  test.beforeEach('Background', async ({ Given, And, page, request }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('カテゴリ管理画面を表示する', null, { page }); 
    await And('テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている', null, { page, request }); 
  });
  
  test('編集ボタンクリックで既存値がプリフィルされたフォームが表示される', { tag: ['@F-03-03-006', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await Then('「カテゴリ編集」フォームが表示される', null, { page }); 
    await And('カテゴリ名に「TEST-CAT-EDIT」が入力されている', null, { page }); 
    await And('親カテゴリが「（ルートカテゴリ）」に設定されている', null, { page }); 
    await And('ツリー上で「TEST-CAT-EDIT」がハイライト表示されている', null, { page }); 
  });

  test('カテゴリ名を変更して保存できる', { tag: ['@F-03-03-006', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await And('カテゴリ名を「TEST-CAT-RENAMED」に変更する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを更新しました。」が表示される', null, { page }); 
    await And('カテゴリツリーに「TEST-CAT-RENAMED」が表示されている', null, { page }); 
  });

  test('説明を変更して保存できる', { tag: ['@F-03-03-006', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await And('説明に「更新後の説明文」を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを更新しました。」が表示される', null, { page }); 
  });

  test('親カテゴリを変更して階層を移動できる', { tag: ['@F-03-03-006', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await And('親カテゴリを「コンピュータ」に変更する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを更新しました。」が表示される', null, { page }); 
    await And('「コンピュータ」の子カテゴリとして「TEST-CAT-EDIT」が表示されている', null, { page }); 
  });

  test('編集をキャンセルするとフォームが閉じてデータは変更されない', { tag: ['@F-03-03-006', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await And('カテゴリ名を「キャンセルテスト」に変更する', null, { page }); 
    await And('「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('編集フォームが閉じている', null, { page }); 
    await And('カテゴリツリーに「TEST-CAT-EDIT」が表示されている', null, { page }); 
  });

  test('カテゴリ名を空にして保存するとバリデーションエラーが表示される', { tag: ['@F-03-03-006', '@UC-013', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await And('カテゴリ名を空にする', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('バリデーションエラー「カテゴリ名は必須です」が表示される', null, { page }); 
  });

  test('カテゴリ名が100文字を超えるとバリデーションエラーが表示される', { tag: ['@F-03-03-006', '@UC-013', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする', null, { page }); 
    await And('カテゴリ名に101文字の文字列を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('カテゴリ名のバリデーションエラーが表示される', null, { page }); 
  });

  test.skip('API呼び出し失敗時にエラーメッセージが表示される', { tag: ['@F-03-03-006', '@UC-013', '@エラー', '@skip'] }, async ({ When, Then, And }) => { 
    await When('「TEST-CAT-EDIT」の編集ボタンをクリックする'); 
    await And('カテゴリ名を「TEST-CAT-ERROR」に変更する'); 
    await And('APIがエラーを返す状態で「保存」ボタンをクリックする'); 
    await Then('エラーメッセージ「カテゴリの更新に失敗しました。」が表示される'); 
  });

  test.describe('全ロールで編集ボタンが操作できる', () => {

    test('Example #1', { tag: ['@F-03-03-006', '@UC-013', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await When('「コンピュータ」にホバーする', null, { page }); 
      await Then('編集ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-03-006', '@UC-013', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await When('「コンピュータ」にホバーする', null, { page }); 
      await Then('編集ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-03-006', '@UC-013', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await When('「コンピュータ」にホバーする', null, { page }); 
      await Then('編集ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-03-006', '@UC-013', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await When('「コンピュータ」にホバーする', null, { page }); 
      await Then('編集ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-03-006', '@UC-013', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await When('「コンピュータ」にホバーする', null, { page }); 
      await Then('編集ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-03-006_edit.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":13,"pickleLine":16,"tags":["@F-03-03-006","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then 「カテゴリ編集」フォームが表示される","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And カテゴリ名に「TEST-CAT-EDIT」が入力されている","stepMatchArguments":[{"group":{"start":7,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 親カテゴリが「（ルートカテゴリ）」に設定されている","stepMatchArguments":[{"group":{"start":7,"value":"（ルートカテゴリ）","children":[]}}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And ツリー上で「TEST-CAT-EDIT」がハイライト表示されている","stepMatchArguments":[{"group":{"start":6,"value":"TEST-CAT-EDIT","children":[]}}]}]},
  {"pwTestLine":21,"pickleLine":24,"tags":["@F-03-03-006","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And カテゴリ名を「TEST-CAT-RENAMED」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-CAT-RENAMED","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを更新しました。","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「TEST-CAT-RENAMED」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-RENAMED","children":[]}}]}]},
  {"pwTestLine":29,"pickleLine":32,"tags":["@F-03-03-006","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 説明に「更新後の説明文」を入力する","stepMatchArguments":[{"group":{"start":4,"value":"更新後の説明文","children":[]}}]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを更新しました。","children":[]}}]}]},
  {"pwTestLine":36,"pickleLine":39,"tags":["@F-03-03-006","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"And 親カテゴリを「コンピュータ」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"コンピュータ","children":[]}}]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを更新しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを更新しました。","children":[]}}]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And 「コンピュータ」の子カテゴリとして「TEST-CAT-EDIT」が表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":18,"value":"TEST-CAT-EDIT","children":[]}}]}]},
  {"pwTestLine":44,"pickleLine":47,"tags":["@F-03-03-006","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"And カテゴリ名を「キャンセルテスト」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"キャンセルテスト","children":[]}}]},{"pwStepLine":47,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And 「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then 編集フォームが閉じている","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「TEST-CAT-EDIT」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]}]},
  {"pwTestLine":52,"pickleLine":57,"tags":["@F-03-03-006","@UC-013","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":53,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":54,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"And カテゴリ名を空にする","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then バリデーションエラー「カテゴリ名は必須です」が表示される","stepMatchArguments":[{"group":{"start":11,"value":"カテゴリ名は必須です","children":[]}}]}]},
  {"pwTestLine":59,"pickleLine":64,"tags":["@F-03-03-006","@UC-013","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":60,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":61,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And カテゴリ名に101文字の文字列を入力する","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then カテゴリ名のバリデーションエラーが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":73,"skipped":true,"tags":["@F-03-03-006","@UC-013","@エラー","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true},{"pwStepLine":67,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-EDIT」の編集ボタンをクリックする"},{"pwStepLine":68,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"And カテゴリ名を「TEST-CAT-ERROR」に変更する"},{"pwStepLine":69,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"And APIがエラーを返す状態で「保存」ボタンをクリックする"},{"pwStepLine":70,"gherkinStepLine":77,"keywordType":"Outcome","textWithKeyword":"Then エラーメッセージ「カテゴリの更新に失敗しました。」が表示される"}]},
  {"pwTestLine":75,"pickleLine":90,"tags":["@F-03-03-006","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":76,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」にホバーする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":79,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then 編集ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":91,"tags":["@F-03-03-006","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":83,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」にホバーする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":86,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then 編集ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":92,"tags":["@F-03-03-006","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":90,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」にホバーする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":93,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then 編集ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":93,"tags":["@F-03-03-006","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":97,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」にホバーする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":100,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then 編集ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":103,"pickleLine":94,"tags":["@F-03-03-006","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-EDIT」がルートカテゴリとして作成されている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-EDIT","children":[]}}]},{"pwStepLine":104,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":105,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」にホバーする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":107,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then 編集ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end