// Generated from: features/F-03/F-03-03-002_create.feature
import { test } from "playwright-bdd";

test.describe('カテゴリ作成（ルート・子カテゴリ）', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('カテゴリ管理画面を表示する', null, { page }); 
  });
  
  test('新規カテゴリボタンクリックで作成フォームが表示される', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする', null, { page }); 
    await Then('「カテゴリ作成」フォームが表示される', null, { page }); 
    await And('親カテゴリが「（ルートカテゴリ）」に設定されている', null, { page }); 
    await And('カテゴリ名が空である', null, { page }); 
    await And('説明が空である', null, { page }); 
  });

  test('ルートカテゴリを作成できる', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする', null, { page }); 
    await And('カテゴリ名に「TEST-CAT-ROOT」を入力する', null, { page }); 
    await And('説明に「テスト用ルートカテゴリ」を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを作成しました。」が表示される', null, { page }); 
    await And('カテゴリツリーに「TEST-CAT-ROOT」が表示されている', null, { page }); 
  });

  test('子カテゴリ追加ボタンで親カテゴリがプリセットされたフォームが表示される', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「コンピュータ」の子カテゴリ追加ボタンをクリックする', null, { page }); 
    await Then('「カテゴリ作成」フォームが表示される', null, { page }); 
    await And('親カテゴリが「コンピュータ」に設定されている', null, { page }); 
  });

  test('子カテゴリを作成できる', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「コンピュータ」の子カテゴリ追加ボタンをクリックする', null, { page }); 
    await And('カテゴリ名に「TEST-CAT-CHILD」を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを作成しました。」が表示される', null, { page }); 
    await And('「コンピュータ」の子カテゴリとして「TEST-CAT-CHILD」が表示されている', null, { page }); 
  });

  test('作成フォームで親カテゴリをセレクトボックスで変更できる', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする', null, { page }); 
    await And('親カテゴリを「周辺機器」に変更する', null, { page }); 
    await And('カテゴリ名に「TEST-CAT-CHILD2」を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを作成しました。」が表示される', null, { page }); 
    await And('「周辺機器」の子カテゴリとして「TEST-CAT-CHILD2」が表示されている', null, { page }); 
  });

  test('作成をキャンセルするとフォームが閉じる', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする', null, { page }); 
    await And('カテゴリ名に「キャンセルテスト」を入力する', null, { page }); 
    await And('「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('作成フォームが閉じている', null, { page }); 
    await And('カテゴリツリーに「キャンセルテスト」が表示されていない', null, { page }); 
  });

  test.skip('保存中はボタンが無効化される', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@正常系', '@skip'] }, async ({ When, Then, And }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする'); 
    await And('カテゴリ名に「TEST-CAT-SUBMIT」を入力する'); 
    await And('「保存」ボタンをクリックする'); 
    await Then('保存中は「保存」ボタンが無効化されている'); 
  });

  test('カテゴリ名未入力で保存するとバリデーションエラーが表示される', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('バリデーションエラー「カテゴリ名は必須です」が表示される', null, { page }); 
  });

  test('カテゴリ名が100文字を超えるとバリデーションエラーが表示される', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする', null, { page }); 
    await And('カテゴリ名に101文字の文字列を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('カテゴリ名のバリデーションエラーが表示される', null, { page }); 
  });

  test.skip('API呼び出し失敗時にエラーメッセージが表示される', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@エラー', '@skip'] }, async ({ When, Then, And }) => { 
    await When('「+ 新規カテゴリ」ボタンをクリックする'); 
    await And('カテゴリ名に「TEST-CAT-ERROR」を入力する'); 
    await And('APIがエラーを返す状態で「保存」ボタンをクリックする'); 
    await Then('エラーメッセージ「カテゴリの作成に失敗しました。」が表示される'); 
  });

  test.describe('全ロールでカテゴリ作成ボタンが操作できる', () => {

    test('Example #1', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await Then('「+ 新規カテゴリ」ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await Then('「+ 新規カテゴリ」ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await Then('「+ 新規カテゴリ」ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await Then('「+ 新規カテゴリ」ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-03-002', '@F-03-03-005', '@UC-013', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await Then('「+ 新規カテゴリ」ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-03-002_create.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then 「カテゴリ作成」フォームが表示される","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 親カテゴリが「（ルートカテゴリ）」に設定されている","stepMatchArguments":[{"group":{"start":7,"value":"（ルートカテゴリ）","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And カテゴリ名が空である","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 説明が空である","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":23,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And カテゴリ名に「TEST-CAT-ROOT」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-CAT-ROOT","children":[]}}]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And 説明に「テスト用ルートカテゴリ」を入力する","stepMatchArguments":[{"group":{"start":4,"value":"テスト用ルートカテゴリ","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを作成しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを作成しました。","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「TEST-CAT-ROOT」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-ROOT","children":[]}}]}]},
  {"pwTestLine":29,"pickleLine":32,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」の子カテゴリ追加ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then 「カテゴリ作成」フォームが表示される","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And 親カテゴリが「コンピュータ」に設定されている","stepMatchArguments":[{"group":{"start":7,"value":"コンピュータ","children":[]}}]}]},
  {"pwTestLine":35,"pickleLine":38,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When 「コンピュータ」の子カテゴリ追加ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}}]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And カテゴリ名に「TEST-CAT-CHILD」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-CAT-CHILD","children":[]}}]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを作成しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを作成しました。","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And 「コンピュータ」の子カテゴリとして「TEST-CAT-CHILD」が表示されている","stepMatchArguments":[{"group":{"start":1,"value":"コンピュータ","children":[]}},{"group":{"start":18,"value":"TEST-CAT-CHILD","children":[]}}]}]},
  {"pwTestLine":43,"pickleLine":46,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"And 親カテゴリを「周辺機器」に変更する","stepMatchArguments":[{"group":{"start":7,"value":"周辺機器","children":[]}}]},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"And カテゴリ名に「TEST-CAT-CHILD2」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-CAT-CHILD2","children":[]}}]},{"pwStepLine":47,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを作成しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを作成しました。","children":[]}}]},{"pwStepLine":49,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And 「周辺機器」の子カテゴリとして「TEST-CAT-CHILD2」が表示されている","stepMatchArguments":[{"group":{"start":1,"value":"周辺機器","children":[]}},{"group":{"start":16,"value":"TEST-CAT-CHILD2","children":[]}}]}]},
  {"pwTestLine":52,"pickleLine":55,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"And カテゴリ名に「キャンセルテスト」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"キャンセルテスト","children":[]}}]},{"pwStepLine":55,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"And 「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"Then 作成フォームが閉じている","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「キャンセルテスト」が表示されていない","stepMatchArguments":[{"group":{"start":9,"value":"キャンセルテスト","children":[]}}]}]},
  {"pwTestLine":60,"pickleLine":63,"skipped":true,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true},{"pwStepLine":61,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする"},{"pwStepLine":62,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"And カテゴリ名に「TEST-CAT-SUBMIT」を入力する"},{"pwStepLine":63,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする"},{"pwStepLine":64,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 保存中は「保存」ボタンが無効化されている"}]},
  {"pwTestLine":67,"pickleLine":72,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then バリデーションエラー「カテゴリ名は必須です」が表示される","stepMatchArguments":[{"group":{"start":11,"value":"カテゴリ名は必須です","children":[]}}]}]},
  {"pwTestLine":73,"pickleLine":78,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"And カテゴリ名に101文字の文字列を入力する","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then カテゴリ名のバリデーションエラーが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":87,"skipped":true,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@エラー","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true},{"pwStepLine":81,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"When 「+ 新規カテゴリ」ボタンをクリックする"},{"pwStepLine":82,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"And カテゴリ名に「TEST-CAT-ERROR」を入力する"},{"pwStepLine":83,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"And APIがエラーを返す状態で「保存」ボタンをクリックする"},{"pwStepLine":84,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then エラーメッセージ「カテゴリの作成に失敗しました。」が表示される"}]},
  {"pwTestLine":89,"pickleLine":103,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規カテゴリ」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":95,"pickleLine":104,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規カテゴリ」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":101,"pickleLine":105,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":103,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規カテゴリ」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":106,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":109,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規カテゴリ」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":113,"pickleLine":107,"tags":["@F-03-03-002","@F-03-03-005","@UC-013","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":115,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規カテゴリ」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end