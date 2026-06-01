// Generated from: features/F-03/F-03-03-007_delete.feature
import { test } from "playwright-bdd";

test.describe('カテゴリ削除', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('カテゴリ管理画面を表示する', null, { page }); 
  });
  
  test('削除ボタンクリックで確認ダイアログが表示される', { tag: ['@F-03-03-007', '@UC-014', '@正常系'] }, async ({ When, Then, And, page, request }) => { 
    await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
    await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
    await Then('確認ダイアログ「カテゴリの削除」が表示される', null, { page }); 
    await And('確認メッセージ「「TEST-CAT-DEL」を削除してもよろしいですか？」が表示される', null, { page }); 
    await And('「削除する」ボタンが表示されている', null, { page }); 
    await And('「キャンセル」ボタンが表示されている', null, { page }); 
  });

  test('製品なし・子なしカテゴリを削除できる', { tag: ['@F-03-03-007', '@UC-014', '@正常系'] }, async ({ When, Then, And, page, request }) => { 
    await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
    await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「カテゴリを削除しました。」が表示される', null, { page }); 
    await And('カテゴリツリーに「TEST-CAT-DEL」が表示されていない', null, { page }); 
  });

  test('削除キャンセルでダイアログが閉じてデータは変更されない', { tag: ['@F-03-03-007', '@UC-014', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「サプライ品」の削除ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('確認ダイアログが閉じている', null, { page }); 
    await And('カテゴリツリーに「サプライ品」が表示されている', null, { page }); 
  });

  test('子カテゴリがあるカテゴリを削除しようとするとエラーが表示される', { tag: ['@F-03-03-007', '@UC-014', '@エラー'] }, async ({ When, Then, And, page }) => { 
    await When('「ネットワーク」の削除ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
    await Then('エラーメッセージ「子カテゴリが存在するため削除できません。」が表示される', null, { page }); 
    await And('カテゴリツリーに「ネットワーク」が表示されている', null, { page }); 
  });

  test('製品が紐付いているカテゴリを削除しようとするとエラーが表示される', { tag: ['@F-03-03-007', '@UC-014', '@エラー'] }, async ({ When, Then, And, page }) => { 
    await When('「サプライ品」の削除ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
    await Then('エラーメッセージ「このカテゴリに紐付く製品が存在するため削除できません。」が表示される', null, { page }); 
    await And('カテゴリツリーに「サプライ品」が表示されている', null, { page }); 
  });

  test.describe('全ロールで削除ボタンが操作できる', () => {

    test('Example #1', { tag: ['@F-03-03-007', '@UC-014', '@権限'] }, async ({ Given, When, Then, And, page, request }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
      await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
      await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
      await Then('成功メッセージ「カテゴリを削除しました。」が表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-03-007', '@UC-014', '@権限'] }, async ({ Given, When, Then, And, page, request }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
      await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
      await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
      await Then('成功メッセージ「カテゴリを削除しました。」が表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-03-007', '@UC-014', '@権限'] }, async ({ Given, When, Then, And, page, request }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
      await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
      await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
      await Then('成功メッセージ「カテゴリを削除しました。」が表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-03-007', '@UC-014', '@権限'] }, async ({ Given, When, Then, And, page, request }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
      await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
      await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
      await Then('成功メッセージ「カテゴリを削除しました。」が表示される', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-03-007', '@UC-014', '@権限'] }, async ({ Given, When, Then, And, page, request }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('カテゴリ管理画面を表示する', null, { page }); 
      await And('テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている', null, { page, request }); 
      await When('「TEST-CAT-DEL」の削除ボタンをクリックする', null, { page }); 
      await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
      await Then('成功メッセージ「カテゴリを削除しました。」が表示される', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-03-007_delete.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-03-007","@UC-014","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then 確認ダイアログ「カテゴリの削除」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリの削除","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And 確認メッセージ「「TEST-CAT-DEL」を削除してもよろしいですか？」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"「TEST-CAT-DEL」を削除してもよろしいですか？","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 「削除する」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 「キャンセル」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":24,"tags":["@F-03-03-007","@UC-014","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを削除しました。","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「TEST-CAT-DEL」が表示されていない","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]}]},
  {"pwTestLine":29,"pickleLine":32,"tags":["@F-03-03-007","@UC-014","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 「サプライ品」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"サプライ品","children":[]}}]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then 確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「サプライ品」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"サプライ品","children":[]}}]}]},
  {"pwTestLine":36,"pickleLine":41,"tags":["@F-03-03-007","@UC-014","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When 「ネットワーク」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"ネットワーク","children":[]}}]},{"pwStepLine":38,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then エラーメッセージ「子カテゴリが存在するため削除できません。」が表示される","stepMatchArguments":[{"group":{"start":9,"value":"子カテゴリが存在するため削除できません。","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「ネットワーク」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"ネットワーク","children":[]}}]}]},
  {"pwTestLine":43,"pickleLine":48,"tags":["@F-03-03-007","@UC-014","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When 「サプライ品」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"サプライ品","children":[]}}]},{"pwStepLine":45,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then エラーメッセージ「このカテゴリに紐付く製品が存在するため削除できません。」が表示される","stepMatchArguments":[{"group":{"start":9,"value":"このカテゴリに紐付く製品が存在するため削除できません。","children":[]}}]},{"pwStepLine":47,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And カテゴリツリーに「サプライ品」が表示されている","stepMatchArguments":[{"group":{"start":9,"value":"サプライ品","children":[]}}]}]},
  {"pwTestLine":52,"pickleLine":67,"tags":["@F-03-03-007","@UC-014","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":56,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":57,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを削除しました。","children":[]}}]}]},
  {"pwTestLine":61,"pickleLine":68,"tags":["@F-03-03-007","@UC-014","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":65,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":66,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを削除しました。","children":[]}}]}]},
  {"pwTestLine":70,"pickleLine":69,"tags":["@F-03-03-007","@UC-014","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":72,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":74,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":75,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを削除しました。","children":[]}}]}]},
  {"pwTestLine":79,"pickleLine":70,"tags":["@F-03-03-007","@UC-014","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":83,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":84,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを削除しました。","children":[]}}]}]},
  {"pwTestLine":88,"pickleLine":71,"tags":["@F-03-03-007","@UC-014","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":90,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And カテゴリ管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And テスト用カテゴリ「TEST-CAT-DEL」がルートカテゴリとして作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":92,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When 「TEST-CAT-DEL」の削除ボタンをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"TEST-CAT-DEL","children":[]}}]},{"pwStepLine":93,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「カテゴリを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"カテゴリを削除しました。","children":[]}}]}]},
]; // bdd-data-end