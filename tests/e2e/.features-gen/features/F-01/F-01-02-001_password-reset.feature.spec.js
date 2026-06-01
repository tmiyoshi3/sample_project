// Generated from: features/F-01/F-01-02-001_password-reset.feature
import { test } from "playwright-bdd";

test.describe('パスワードリセット', () => {

  test('ログイン画面からパスワードリセット画面に遷移する', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ユーザーが未認証状態である', null, { page }); 
    await And('ログイン画面が表示されている', null, { page }); 
    await When('パスワードリセットリンクをクリックする', null, { page }); 
    await Then('パスワードリセット画面が表示される', null, { page }); 
  });

  test('パスワードリセット画面の初期表示が正しい', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('パスワードリセット画面が表示されている', null, { page }); 
    await Then('パスワードリセットの見出しが表示されている', null, { page }); 
    await And('ユーザー名またはメールアドレス入力フィールドが表示されている', null, { page }); 
    await And('送信ボタンが表示されている', null, { page }); 
    await And('"ログインに戻る" リンクが表示されている', null, { page }); 
    await And('言語切替ドロップダウンが表示されている', null, { page }); 
  });

  test.skip('ユーザー名を入力してパスワードリセットを送信する', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@正常系', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('パスワードリセット画面が表示されている'); 
    await When('ユーザー名またはメールアドレスを入力する'); 
    await And('送信ボタンをクリックする'); 
    await Then('パスワードリセットメールの送信が要求される'); 
  });

  test('パスワードリセット画面からログイン画面に戻る', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('パスワードリセット画面が表示されている', null, { page }); 
    await When('"ログインに戻る" リンクをクリックする', null, { page }); 
    await Then('ログイン画面が表示される', null, { page }); 
  });

  test.skip('パスワードリセット完了後に新しいパスワードでログインできる', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@正常系', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('ユーザーがパスワードリセットを完了している'); 
    await When('ログイン画面でユーザー名を入力する'); 
    await And('新しいパスワードを入力する'); 
    await And('ログインボタンをクリックする'); 
    await Then('ダッシュボード画面が表示される'); 
  });

  test('空のままパスワードリセットを送信する', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@バリデーション'] }, async ({ Given, When, Then, page }) => { 
    await Given('パスワードリセット画面が表示されている', null, { page }); 
    await When('送信ボタンをクリックする', null, { page }); 
    await Then('エラーメッセージが表示される', null, { page }); 
  });

  test.skip('存在しないユーザー名でパスワードリセットを送信する', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@エラー', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('パスワードリセット画面が表示されている'); 
    await When('存在しないユーザー名を入力する'); 
    await And('送信ボタンをクリックする'); 
    await Then('ユーザー列挙防止のため、存在するユーザーと同一の応答が返される'); 
  });

  test.skip('パスワードリセット画面でセッションタイムアウトが発生する', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@エラー', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('パスワードリセット画面が表示されている'); 
    await And('セッションがタイムアウトしている'); 
    await When('ユーザー名またはメールアドレスを入力する'); 
    await And('送信ボタンをクリックする'); 
    await Then('セッションタイムアウトのエラーが表示される'); 
  });

  test('未認証ユーザーのみパスワードリセット画面にアクセスできる', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ユーザーが未認証状態である', null, { page }); 
    await And('ログイン画面が表示されている', null, { page }); 
    await When('パスワードリセットリンクをクリックする', null, { page }); 
    await Then('パスワードリセット画面が表示される', null, { page }); 
  });

  test('認証済みユーザーはパスワードリセット画面に到達しない', { tag: ['@F-01-01-005', '@F-01-02-001', '@UC-003', '@権限'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('ユーザーがすでにログイン済みである', null, { page }); 
    await When('システムのトップ画面にアクセスする', null, { page }); 
    await Then('ログイン画面は表示されない', null, { page }); 
    await And('パスワードリセット画面には到達しない', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-01/F-01-02-001_password-reset.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When パスワードリセットリンクをクリックする","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then パスワードリセット画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":15,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@正常系"],"steps":[{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given パスワードリセット画面が表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then パスワードリセットの見出しが表示されている","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And ユーザー名またはメールアドレス入力フィールドが表示されている","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And 送信ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And \"ログインに戻る\" リンクが表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"ログインに戻る\"","children":[{"start":1,"value":"ログインに戻る","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 言語切替ドロップダウンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":26,"skipped":true,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@正常系","@skip"],"steps":[{"pwStepLine":23,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given パスワードリセット画面が表示されている"},{"pwStepLine":24,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When ユーザー名またはメールアドレスを入力する"},{"pwStepLine":25,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 送信ボタンをクリックする"},{"pwStepLine":26,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then パスワードリセットメールの送信が要求される"}]},
  {"pwTestLine":29,"pickleLine":35,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@正常系"],"steps":[{"pwStepLine":30,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given パスワードリセット画面が表示されている","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When \"ログインに戻る\" リンクをクリックする","stepMatchArguments":[{"group":{"start":0,"value":"\"ログインに戻る\"","children":[{"start":1,"value":"ログインに戻る","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":43,"skipped":true,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@正常系","@skip"],"steps":[{"pwStepLine":36,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given ユーザーがパスワードリセットを完了している"},{"pwStepLine":37,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When ログイン画面でユーザー名を入力する"},{"pwStepLine":38,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And 新しいパスワードを入力する"},{"pwStepLine":39,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And ログインボタンをクリックする"},{"pwStepLine":40,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then ダッシュボード画面が表示される"}]},
  {"pwTestLine":43,"pickleLine":53,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@バリデーション"],"steps":[{"pwStepLine":44,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given パスワードリセット画面が表示されている","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When 送信ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then エラーメッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":61,"skipped":true,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@エラー","@skip"],"steps":[{"pwStepLine":50,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"Given パスワードリセット画面が表示されている"},{"pwStepLine":51,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When 存在しないユーザー名を入力する"},{"pwStepLine":52,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"And 送信ボタンをクリックする"},{"pwStepLine":53,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then ユーザー列挙防止のため、存在するユーザーと同一の応答が返される"}]},
  {"pwTestLine":56,"pickleLine":68,"skipped":true,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@エラー","@skip"],"steps":[{"pwStepLine":57,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"Given パスワードリセット画面が表示されている"},{"pwStepLine":58,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"And セッションがタイムアウトしている"},{"pwStepLine":59,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"When ユーザー名またはメールアドレスを入力する"},{"pwStepLine":60,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"And 送信ボタンをクリックする"},{"pwStepLine":61,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then セッションタイムアウトのエラーが表示される"}]},
  {"pwTestLine":64,"pickleLine":78,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@権限"],"steps":[{"pwStepLine":65,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"Given ユーザーが未認証状態である","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"And ログイン画面が表示されている","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When パスワードリセットリンクをクリックする","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then パスワードリセット画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":71,"pickleLine":85,"tags":["@F-01-01-005","@F-01-02-001","@UC-003","@権限"],"steps":[{"pwStepLine":72,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given ユーザーがすでにログイン済みである","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When システムのトップ画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then ログイン画面は表示されない","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"And パスワードリセット画面には到達しない","stepMatchArguments":[]}]},
]; // bdd-data-end