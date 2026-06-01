// Generated from: features/F-03/F-03-04-002_create.feature
import { test } from "playwright-bdd";

test.describe('バンドル作成', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('バンドル管理画面を表示する', null, { page }); 
  });
  
  test('新規バンドル作成ボタンクリックで作成フォームが表示される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await Then('「バンドル作成」フォームが表示される', null, { page }); 
    await And('バンドル名が空である', null, { page }); 
    await And('ステータスが「有効」に設定されている', null, { page }); 
    await And('説明が空である', null, { page }); 
    await And('構成製品テーブルが空である', null, { page }); 
    await And('「上の検索欄から製品を追加してください」メッセージが表示されている', null, { page }); 
    await And('バンドル一覧が非表示である', null, { page }); 
  });

  test('バンドルを作成できる', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('バンドル名に「TEST-BDL-001」を入力する', null, { page }); 
    await And('説明に「テスト用バンドル」を入力する', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「バンドルを作成しました。」が表示される', null, { page }); 
    await And('バンドル一覧に「TEST-BDL-001」が表示されている', null, { page }); 
  });

  test('製品検索でドロップダウンに候補が表示される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄にキーワードを入力する', null, { page }); 
    await Then('検索ドロップダウンに候補が最大10件表示される', null, { page }); 
    await And('候補にSKU・製品名・単価が表示されている', null, { page }); 
  });

  test('製品を追加すると構成製品テーブルに行が追加される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await Then('構成製品テーブルに追加された製品が表示されている', null, { page }); 
    await And('追加された製品の数量が1である', null, { page }); 
    await And('価格計算エリアが表示されている', null, { page }); 
  });

  test('同じ製品を再度追加すると数量が加算される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await And('同じ製品を再度検索して追加する', null, { page }); 
    await Then('追加された製品の数量が2である', null, { page }); 
  });

  test('構成製品の数量を変更すると価格が再計算される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await And('構成製品の数量を変更する', null, { page }); 
    await Then('合計・割引額・バンドル価格が再計算されている', null, { page }); 
  });

  test('割引率を変更すると価格が再計算される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await And('割引率を変更する', null, { page }); 
    await Then('割引額・バンドル価格が再計算されている', null, { page }); 
  });

  test('構成製品を削除すると価格が再計算される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を2件追加する', null, { page }); 
    await And('構成製品テーブルの1行目の削除ボタンをクリックする', null, { page }); 
    await Then('構成製品テーブルが1件になっている', null, { page }); 
    await And('合計・割引額・バンドル価格が再計算されている', null, { page }); 
  });

  test('作成をキャンセルするとフォームが閉じる', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('バンドル名に「キャンセルテスト」を入力する', null, { page }); 
    await And('「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('作成フォームが閉じている', null, { page }); 
    await And('バンドル一覧が表示されている', null, { page }); 
    await And('バンドル一覧に「キャンセルテスト」が表示されていない', null, { page }); 
  });

  test('バンドル名未入力で保存するとフォームが送信されない', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('製品検索欄で製品を検索して追加する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('作成フォームが表示されたままである', null, { page }); 
  });

  test('構成製品0件で保存するとエラーメッセージが表示される', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
    await When('「+ 新規バンドル作成」ボタンをクリックする', null, { page }); 
    await And('バンドル名に「TEST-BDL-EMPTY」を入力する', null, { page }); 
    await And('「保存」ボタンをクリックする', null, { page }); 
    await Then('エラーメッセージ「バンドルには少なくとも1つの製品を追加してください。」が表示される', null, { page }); 
  });

  test.describe('全ロールでバンドル作成ボタンが操作できる', () => {

    test('Example #1', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('「+ 新規バンドル作成」ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('「+ 新規バンドル作成」ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('「+ 新規バンドル作成」ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('「+ 新規バンドル作成」ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-04-002', '@F-03-04-003', '@F-03-04-004', '@UC-016', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('「+ 新規バンドル作成」ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-04-002_create.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then 「バンドル作成」フォームが表示される","stepMatchArguments":[{"group":{"start":1,"value":"バンドル作成","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And バンドル名が空である","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And ステータスが「有効」に設定されている","stepMatchArguments":[{"group":{"start":7,"value":"有効","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 説明が空である","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 構成製品テーブルが空である","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 「上の検索欄から製品を追加してください」メッセージが表示されている","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧が非表示である","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":26,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And バンドル名に「TEST-BDL-001」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-BDL-001","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 説明に「テスト用バンドル」を入力する","stepMatchArguments":[{"group":{"start":4,"value":"テスト用バンドル","children":[]}}]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「バンドルを作成しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"バンドルを作成しました。","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧に「TEST-BDL-001」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-001","children":[]}}]}]},
  {"pwTestLine":33,"pickleLine":36,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And 製品検索欄にキーワードを入力する","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then 検索ドロップダウンに候補が最大10件表示される","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And 候補にSKU・製品名・単価が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":43,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then 構成製品テーブルに追加された製品が表示されている","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And 追加された製品の数量が1である","stepMatchArguments":[{"group":{"start":11,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And 価格計算エリアが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":51,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"And 同じ製品を再度検索して追加する","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 追加された製品の数量が2である","stepMatchArguments":[{"group":{"start":11,"value":"2","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":55,"pickleLine":58,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"And 構成製品の数量を変更する","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then 合計・割引額・バンドル価格が再計算されている","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":65,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"And 割引率を変更する","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then 割引額・バンドル価格が再計算されている","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":72,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を2件追加する","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"And 構成製品テーブルの1行目の削除ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then 構成製品テーブルが1件になっている","stepMatchArguments":[{"group":{"start":9,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":74,"gherkinStepLine":77,"keywordType":"Outcome","textWithKeyword":"And 合計・割引額・バンドル価格が再計算されている","stepMatchArguments":[]}]},
  {"pwTestLine":77,"pickleLine":80,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"And バンドル名に「キャンセルテスト」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"キャンセルテスト","children":[]}}]},{"pwStepLine":80,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"And 「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"Then 作成フォームが閉じている","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧が表示されている","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧に「キャンセルテスト」が表示されていない","stepMatchArguments":[{"group":{"start":8,"value":"キャンセルテスト","children":[]}}]}]},
  {"pwTestLine":86,"pickleLine":91,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":92,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"And 製品検索欄で製品を検索して追加する","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":94,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":95,"keywordType":"Outcome","textWithKeyword":"Then 作成フォームが表示されたままである","stepMatchArguments":[]}]},
  {"pwTestLine":93,"pickleLine":98,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When 「+ 新規バンドル作成」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And バンドル名に「TEST-BDL-EMPTY」を入力する","stepMatchArguments":[{"group":{"start":7,"value":"TEST-BDL-EMPTY","children":[]}}]},{"pwStepLine":96,"gherkinStepLine":101,"keywordType":"Action","textWithKeyword":"And 「保存」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":102,"keywordType":"Outcome","textWithKeyword":"Then エラーメッセージ「バンドルには少なくとも1つの製品を追加してください。」が表示される","stepMatchArguments":[{"group":{"start":9,"value":"バンドルには少なくとも1つの製品を追加してください。","children":[]}}]}]},
  {"pwTestLine":102,"pickleLine":114,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規バンドル作成」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":108,"pickleLine":115,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規バンドル作成」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":114,"pickleLine":116,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":116,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規バンドル作成」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":120,"pickleLine":117,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":122,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規バンドル作成」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":126,"pickleLine":118,"tags":["@F-03-04-002","@F-03-04-003","@F-03-04-004","@UC-016","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":128,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then 「+ 新規バンドル作成」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end