// Generated from: features/F-01/F-01-01-001_login.feature
import { test } from "playwright-bdd";

test.describe('ログイン認証', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('ユーザーが未認証状態である', null, { page }); 
    await And('ログイン画面が表示されている', null, { page }); 
  });
  
  test('ログイン画面の初期表示が正しい', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('ユーザー名入力フィールドが表示されている', null, { page }); 
    await And('ユーザー名フィールドのラベルが "ユーザー名またはメールアドレス" である', null, { page }); 
    await And('パスワード入力フィールドが表示されている', null, { page }); 
    await And('パスワードフィールドのラベルが "パスワード" である', null, { page }); 
    await And('ログインボタンが表示されている', null, { page }); 
    await And('ログインボタンのラベルが正しい', null, { page }); 
    await And('ユーザー名フィールドに初期フォーカスがある', null, { page }); 
    await And('パスワードはマスク表示されている', null, { page }); 
    await And('パスワードリセットリンクが表示されている', null, { page }); 
    await And('言語切替ドロップダウンが表示されている', null, { page }); 
  });

  test('正しい認証情報でログインするとダッシュボードに遷移する', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('ユーザー名を入力する', null, { page }); 
    await And('パスワードを入力する', null, { page }); 
    await And('ログインボタンをクリックする', null, { page }); 
    await Then('ダッシュボード画面が表示される', null, { page }); 
  });

  test('認証済みユーザーはログイン画面をスキップする', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ユーザーがすでにログイン済みである', null, { page }); 
    await When('システムのトップ画面にアクセスする', null, { page }); 
    await Then('ログイン画面は表示されない', null, { page }); 
    await And('ダッシュボード画面が表示される', null, { page }); 
  });

  test('特定画面のURLに直接アクセスした場合ログイン後にリダイレクトされる', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ユーザーが未認証状態で特定の業務画面URLにアクセスする', null, { page }); 
    await And('ログイン画面にリダイレクトされる', null, { page }); 
    await When('ユーザー名を入力する', null, { page }); 
    await And('パスワードを入力する', null, { page }); 
    await And('ログインボタンをクリックする', null, { page }); 
    await Then('最初にアクセスした業務画面にリダイレクトされる', null, { page }); 
  });

  test.describe('認証情報が不完全な場合エラーになる', () => {

    test('Example #1', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
      await When('ユーザー名に "" を入力する', null, { page }); 
      await And('パスワードに "" を入力する', null, { page }); 
      await And('ログインボタンをクリックする', null, { page }); 
      await Then('"無効なユーザー名またはパスワードです。" というエラーメッセージが表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
      await When('ユーザー名に "admin" を入力する', null, { page }); 
      await And('パスワードに "" を入力する', null, { page }); 
      await And('ログインボタンをクリックする', null, { page }); 
      await Then('"無効なユーザー名またはパスワードです。" というエラーメッセージが表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@バリデーション'] }, async ({ When, Then, And, page }) => { 
      await When('ユーザー名に "" を入力する', null, { page }); 
      await And('パスワードに "admin123" を入力する', null, { page }); 
      await And('ログインボタンをクリックする', null, { page }); 
      await Then('"無効なユーザー名またはパスワードです。" というエラーメッセージが表示される', null, { page }); 
    });

  });

  test('誤ったパスワードでログインする', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@エラー'] }, async ({ When, Then, And, page }) => { 
    await When('ユーザー名に "admin" を入力する', null, { page }); 
    await And('パスワードに "wrongpassword" を入力する', null, { page }); 
    await And('ログインボタンをクリックする', null, { page }); 
    await Then('"無効なユーザー名またはパスワードです。" というエラーメッセージが表示される', null, { page }); 
    await And('ユーザー名フィールドに "admin" が保持されている', null, { page }); 
    await And('パスワードフィールドがクリアされている', null, { page }); 
  });

  test('存在しないユーザーでログインしても同一エラーメッセージが表示される', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@エラー'] }, async ({ When, Then, And, page }) => { 
    await When('ユーザー名に "nonexistent_user" を入力する', null, { page }); 
    await And('パスワードに "anypassword" を入力する', null, { page }); 
    await And('ログインボタンをクリックする', null, { page }); 
    await Then('"無効なユーザー名またはパスワードです。" というエラーメッセージが表示される', null, { page }); 
  });

  test.skip('セッションタイムアウト後にログインを試みる', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@エラー', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('ログイン画面のセッションがタイムアウトしている'); 
    await When('ユーザー名を入力する'); 
    await And('パスワードを入力する'); 
    await And('ログインボタンをクリックする'); 
    await Then('"ログイン試行がタイムアウトしました。ログインは最初から開始されます。" というメッセージが表示される'); 
    await And('新しいセッションでログイン画面が再表示される'); 
  });

  test.skip('ブルートフォース保護によるアカウントロック', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@エラー', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('ユーザー "admin" で5回連続認証に失敗している'); 
    await When('ユーザー名に "admin" を入力する'); 
    await And('正しいパスワードを入力する'); 
    await And('ログインボタンをクリックする'); 
    await Then('アカウントロックのエラーメッセージが表示される'); 
    await And('15分間ログインできない'); 
  });

  test('認証エラー後のフォーム状態', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@状態変化'] }, async ({ When, Then, And, page }) => { 
    await When('ユーザー名に "admin" を入力する', null, { page }); 
    await And('パスワードに "wrongpassword" を入力する', null, { page }); 
    await And('ログインボタンをクリックする', null, { page }); 
    await Then('ユーザー名フィールドに "admin" が保持されている', null, { page }); 
    await And('パスワードフィールドがクリアされている', null, { page }); 
    await And('入力フィールドにエラー状態が表示されている', null, { page }); 
  });

  test.skip('ログイン成功後の状態', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@状態変化', '@skip'] }, async ({ When, Then, And }) => { 
    await When('ユーザー名を入力する'); 
    await And('パスワードを入力する'); 
    await And('ログインボタンをクリックする'); 
    await Then('ダッシュボード画面が表示される'); 
    await And('以降のAPIリクエストにBearerトークンが自動付与される'); 
    await And('トークンの有効期限は5分である'); 
  });

  test.describe('各ロールのユーザーがログインできる', () => {

    test('Example #1', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@権限'] }, async ({ When, Then, page }) => { 
      await When('ロール "ADMIN" のテストユーザーでログインする', null, { page }); 
      await Then('ダッシュボード画面が表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@権限'] }, async ({ When, Then, page }) => { 
      await When('ロール "MANAGER" のテストユーザーでログインする', null, { page }); 
      await Then('ダッシュボード画面が表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@権限'] }, async ({ When, Then, page }) => { 
      await When('ロール "BUYER" のテストユーザーでログインする', null, { page }); 
      await Then('ダッシュボード画面が表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@権限'] }, async ({ When, Then, page }) => { 
      await When('ロール "WAREHOUSE_STAFF" のテストユーザーでログインする', null, { page }); 
      await Then('ダッシュボード画面が表示される', null, { page }); 
    });

    test('Example #5', { tag: ['@F-01-01-001', '@F-01-01-002', '@F-01-01-003', '@UC-001', '@権限'] }, async ({ When, Then, page }) => { 
      await When('ロール "VIEWER" のテストユーザーでログインする', null, { page }); 
      await Then('ダッシュボード画面が表示される', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-01/F-01-01-001_login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then ユーザー名入力フィールドが表示されている","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And ユーザー名フィールドのラベルが \"ユーザー名またはメールアドレス\" である","stepMatchArguments":[{"group":{"start":16,"value":"\"ユーザー名またはメールアドレス\"","children":[{"start":17,"value":"ユーザー名またはメールアドレス","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And パスワード入力フィールドが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And パスワードフィールドのラベルが \"パスワード\" である","stepMatchArguments":[{"group":{"start":16,"value":"\"パスワード\"","children":[{"start":17,"value":"パスワード","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And ログインボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And ログインボタンのラベルが正しい","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And ユーザー名フィールドに初期フォーカスがある","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And パスワードはマスク表示されている","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And パスワードリセットリンクが表示されている","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 言語切替ドロップダウンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":25,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When ユーザー名を入力する","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And パスワードを入力する","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":32,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given ユーザーがすでにログイン済みである","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When システムのトップ画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面は表示されない","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And ダッシュボード画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":39,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態で特定の業務画面URLにアクセスする","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And ログイン画面にリダイレクトされる","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When ユーザー名を入力する","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And パスワードを入力する","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then 最初にアクセスした業務画面にリダイレクトされる","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":58,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"\"","children":[{"start":8,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And パスワードに \"\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"\"","children":[{"start":8,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then \"無効なユーザー名またはパスワードです。\" というエラーメッセージが表示される","stepMatchArguments":[{"group":{"start":0,"value":"\"無効なユーザー名またはパスワードです。\"","children":[{"start":1,"value":"無効なユーザー名またはパスワードです。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":56,"pickleLine":59,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"admin\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"admin\"","children":[{"start":8,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And パスワードに \"\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"\"","children":[{"start":8,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then \"無効なユーザー名またはパスワードです。\" というエラーメッセージが表示される","stepMatchArguments":[{"group":{"start":0,"value":"\"無効なユーザー名またはパスワードです。\"","children":[{"start":1,"value":"無効なユーザー名またはパスワードです。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":63,"pickleLine":60,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"\"","children":[{"start":8,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And パスワードに \"admin123\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"admin123\"","children":[{"start":8,"value":"admin123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then \"無効なユーザー名またはパスワードです。\" というエラーメッセージが表示される","stepMatchArguments":[{"group":{"start":0,"value":"\"無効なユーザー名またはパスワードです。\"","children":[{"start":1,"value":"無効なユーザー名またはパスワードです。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":72,"pickleLine":65,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"admin\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"admin\"","children":[{"start":8,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And パスワードに \"wrongpassword\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"wrongpassword\"","children":[{"start":8,"value":"wrongpassword","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then \"無効なユーザー名またはパスワードです。\" というエラーメッセージが表示される","stepMatchArguments":[{"group":{"start":0,"value":"\"無効なユーザー名またはパスワードです。\"","children":[{"start":1,"value":"無効なユーザー名またはパスワードです。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And ユーザー名フィールドに \"admin\" が保持されている","stepMatchArguments":[{"group":{"start":12,"value":"\"admin\"","children":[{"start":13,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":78,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"And パスワードフィールドがクリアされている","stepMatchArguments":[]}]},
  {"pwTestLine":81,"pickleLine":74,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"nonexistent_user\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"nonexistent_user\"","children":[{"start":8,"value":"nonexistent_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":83,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"And パスワードに \"anypassword\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"anypassword\"","children":[{"start":8,"value":"anypassword","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then \"無効なユーザー名またはパスワードです。\" というエラーメッセージが表示される","stepMatchArguments":[{"group":{"start":0,"value":"\"無効なユーザー名またはパスワードです。\"","children":[{"start":1,"value":"無効なユーザー名またはパスワードです。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":88,"pickleLine":81,"skipped":true,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@エラー","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true},{"pwStepLine":89,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Given ログイン画面のセッションがタイムアウトしている"},{"pwStepLine":90,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"When ユーザー名を入力する"},{"pwStepLine":91,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And パスワードを入力する"},{"pwStepLine":92,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする"},{"pwStepLine":93,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then \"ログイン試行がタイムアウトしました。ログインは最初から開始されます。\" というメッセージが表示される"},{"pwStepLine":94,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"And 新しいセッションでログイン画面が再表示される"}]},
  {"pwTestLine":97,"pickleLine":90,"skipped":true,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@エラー","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true},{"pwStepLine":98,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"Given ユーザー \"admin\" で5回連続認証に失敗している"},{"pwStepLine":99,"gherkinStepLine":92,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"admin\" を入力する"},{"pwStepLine":100,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"And 正しいパスワードを入力する"},{"pwStepLine":101,"gherkinStepLine":94,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする"},{"pwStepLine":102,"gherkinStepLine":95,"keywordType":"Outcome","textWithKeyword":"Then アカウントロックのエラーメッセージが表示される"},{"pwStepLine":103,"gherkinStepLine":96,"keywordType":"Outcome","textWithKeyword":"And 15分間ログインできない"}]},
  {"pwTestLine":106,"pickleLine":101,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@状態変化"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"When ユーザー名に \"admin\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"admin\"","children":[{"start":8,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":108,"gherkinStepLine":103,"keywordType":"Action","textWithKeyword":"And パスワードに \"wrongpassword\" を入力する","stepMatchArguments":[{"group":{"start":7,"value":"\"wrongpassword\"","children":[{"start":8,"value":"wrongpassword","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":109,"gherkinStepLine":104,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":105,"keywordType":"Outcome","textWithKeyword":"Then ユーザー名フィールドに \"admin\" が保持されている","stepMatchArguments":[{"group":{"start":12,"value":"\"admin\"","children":[{"start":13,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":111,"gherkinStepLine":106,"keywordType":"Outcome","textWithKeyword":"And パスワードフィールドがクリアされている","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":107,"keywordType":"Outcome","textWithKeyword":"And 入力フィールドにエラー状態が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":115,"pickleLine":110,"skipped":true,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@状態変化","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true},{"pwStepLine":116,"gherkinStepLine":111,"keywordType":"Action","textWithKeyword":"When ユーザー名を入力する"},{"pwStepLine":117,"gherkinStepLine":112,"keywordType":"Action","textWithKeyword":"And パスワードを入力する"},{"pwStepLine":118,"gherkinStepLine":113,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする"},{"pwStepLine":119,"gherkinStepLine":114,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される"},{"pwStepLine":120,"gherkinStepLine":115,"keywordType":"Outcome","textWithKeyword":"And 以降のAPIリクエストにBearerトークンが自動付与される"},{"pwStepLine":121,"gherkinStepLine":116,"keywordType":"Outcome","textWithKeyword":"And トークンの有効期限は5分である"}]},
  {"pwTestLine":126,"pickleLine":127,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When ロール \"ADMIN\" のテストユーザーでログインする","stepMatchArguments":[{"group":{"start":4,"value":"\"ADMIN\"","children":[{"start":5,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":128,"gherkinStepLine":123,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":131,"pickleLine":128,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When ロール \"MANAGER\" のテストユーザーでログインする","stepMatchArguments":[{"group":{"start":4,"value":"\"MANAGER\"","children":[{"start":5,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":133,"gherkinStepLine":123,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":136,"pickleLine":129,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When ロール \"BUYER\" のテストユーザーでログインする","stepMatchArguments":[{"group":{"start":4,"value":"\"BUYER\"","children":[{"start":5,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":138,"gherkinStepLine":123,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":141,"pickleLine":130,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When ロール \"WAREHOUSE_STAFF\" のテストユーザーでログインする","stepMatchArguments":[{"group":{"start":4,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":5,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":143,"gherkinStepLine":123,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":146,"pickleLine":131,"tags":["@F-01-01-001","@F-01-01-002","@F-01-01-003","@UC-001","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When ロール \"VIEWER\" のテストユーザーでログインする","stepMatchArguments":[{"group":{"start":4,"value":"\"VIEWER\"","children":[{"start":5,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":148,"gherkinStepLine":123,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される","stepMatchArguments":[]}]},
]; // bdd-data-end