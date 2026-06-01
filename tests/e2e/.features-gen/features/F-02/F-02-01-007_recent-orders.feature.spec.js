// Generated from: features/F-02/F-02-01-007_recent-orders.feature
import { test } from "playwright-bdd";

test.describe('最近の発注状況確認', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('ダッシュボード画面が表示されている', null, { page }); 
  });
  
  test('最近の発注テーブルに上位10件が表示される', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('発注書データが10件以上存在する'); 
    await Then('最近の発注テーブルに10件表示されている', null, { page }); 
    await And('発注テーブルは発注日の降順でソートされている', null, { page }); 
  });

  test('発注テーブルの各列が正しく表示される', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('発注書データが存在する'); 
    await Then('発注テーブルに発注番号が表示されている', null, { page }); 
    await And('発注テーブルにサプライヤー名が表示されている', null, { page }); 
    await And('発注テーブルに発注日が表示されている', null, { page }); 
    await And('発注テーブルに金額が表示されている', null, { page }); 
    await And('発注テーブルにステータスが表示されている', null, { page }); 
  });

  test('発注日がYYYY年MM月DD日形式で表示される', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('発注書データが存在する'); 
    await Then('発注テーブルの発注日が "YYYY年MM月DD日" 形式で表示されている', null, { page }); 
  });

  test('金額が円記号カンマ区切りで表示される', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('発注書データが存在する'); 
    await Then('発注テーブルの金額が "¥X,XXX,XXX" 形式で表示されている', null, { page }); 
  });

  test('発注件数カードに合計と内訳が表示される', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('発注書データが存在する'); 
    await Then('"発注件数" カードのメイン値に発注書の合計件数が表示されている', null, { page }); 
    await And('"発注件数" カードに保留中の件数が表示されている', null, { page }); 
    await And('"発注件数" カードに承認済みの件数が表示されている', null, { page }); 
  });

  test('発注テーブルの行をクリックすると発注詳細画面に遷移する', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@ナビゲーション'] }, async ({ Given, When, Then, page }) => { 
    await Given('発注書データが存在する'); 
    await When('最近の発注テーブルの行をクリックする', null, { page }); 
    await Then('該当発注書の発注詳細画面に遷移する', null, { page }); 
  });

  test('すべて表示リンクで発注書一覧画面に遷移する', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@ナビゲーション'] }, async ({ When, Then, page }) => { 
    await When('最近の発注セクションの "すべて表示" リンクをクリックする', null, { page }); 
    await Then('発注書一覧画面に遷移する', null, { page }); 
  });

  test.skip('発注データがない場合の表示', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態', '@skip'] }, async ({ Given, Then, And }) => { 
    await Given('発注書データが存在しない'); 
    await Then('最近の発注テーブルに "最近の発注はありません" と表示されている'); 
    await And('"発注件数" カードのメイン値が "0" である'); 
  });

  test.describe('各ステータスの発注書が正しいラベルで表示される', () => {

    test('Example #1', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態'] }, async ({ Given, Then, page }) => { 
      await Given('ステータスが "DRAFT" の発注書が存在する'); 
      await Then('発注テーブルに "下書き" というステータスラベルが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態'] }, async ({ Given, Then, page }) => { 
      await Given('ステータスが "SUBMITTED" の発注書が存在する'); 
      await Then('発注テーブルに "申請中" というステータスラベルが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態'] }, async ({ Given, Then, page }) => { 
      await Given('ステータスが "APPROVED" の発注書が存在する'); 
      await Then('発注テーブルに "承認済み" というステータスラベルが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態'] }, async ({ Given, Then, page }) => { 
      await Given('ステータスが "ORDERED" の発注書が存在する'); 
      await Then('発注テーブルに "発注済み" というステータスラベルが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態'] }, async ({ Given, Then, page }) => { 
      await Given('ステータスが "REJECTED" の発注書が存在する'); 
      await Then('発注テーブルに "却下" というステータスラベルが表示されている', null, { page }); 
    });

    test('Example #6', { tag: ['@F-02-01-001', '@F-02-01-007', '@F-02-01-008', '@UC-007', '@データ状態'] }, async ({ Given, Then, page }) => { 
      await Given('ステータスが "CANCELLED" の発注書が存在する'); 
      await Then('発注テーブルに "キャンセル" というステータスラベルが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-02/F-02-01-007_recent-orders.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given 発注書データが10件以上存在する","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then 最近の発注テーブルに10件表示されている","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And 発注テーブルは発注日の降順でソートされている","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":18,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given 発注書データが存在する","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに発注番号が表示されている","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 発注テーブルにサプライヤー名が表示されている","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 発注テーブルに発注日が表示されている","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And 発注テーブルに金額が表示されている","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And 発注テーブルにステータスが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":27,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given 発注書データが存在する","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルの発注日が \"YYYY年MM月DD日\" 形式で表示されている","stepMatchArguments":[{"group":{"start":12,"value":"\"YYYY年MM月DD日\"","children":[{"start":13,"value":"YYYY年MM月DD日","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":31,"pickleLine":32,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given 発注書データが存在する","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルの金額が \"¥X,XXX,XXX\" 形式で表示されている","stepMatchArguments":[{"group":{"start":11,"value":"\"¥X,XXX,XXX\"","children":[{"start":12,"value":"¥X,XXX,XXX","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":37,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given 発注書データが存在する","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then \"発注件数\" カードのメイン値に発注書の合計件数が表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"発注件数\"","children":[{"start":1,"value":"発注件数","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And \"発注件数\" カードに保留中の件数が表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"発注件数\"","children":[{"start":1,"value":"発注件数","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And \"発注件数\" カードに承認済みの件数が表示されている","stepMatchArguments":[{"group":{"start":0,"value":"\"発注件数\"","children":[{"start":1,"value":"発注件数","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":43,"pickleLine":46,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@ナビゲーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given 発注書データが存在する","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When 最近の発注テーブルの行をクリックする","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then 該当発注書の発注詳細画面に遷移する","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":52,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@ナビゲーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When 最近の発注セクションの \"すべて表示\" リンクをクリックする","stepMatchArguments":[{"group":{"start":12,"value":"\"すべて表示\"","children":[{"start":13,"value":"すべて表示","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then 発注書一覧画面に遷移する","stepMatchArguments":[]}]},
  {"pwTestLine":54,"pickleLine":59,"skipped":true,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":55,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"Given 発注書データが存在しない"},{"pwStepLine":56,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 最近の発注テーブルに \"最近の発注はありません\" と表示されている"},{"pwStepLine":57,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And \"発注件数\" カードのメイン値が \"0\" である"}]},
  {"pwTestLine":62,"pickleLine":71,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given ステータスが \"DRAFT\" の発注書が存在する","stepMatchArguments":[{"group":{"start":7,"value":"\"DRAFT\"","children":[{"start":8,"value":"DRAFT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに \"下書き\" というステータスラベルが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"\"下書き\"","children":[{"start":9,"value":"下書き","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":67,"pickleLine":72,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given ステータスが \"SUBMITTED\" の発注書が存在する","stepMatchArguments":[{"group":{"start":7,"value":"\"SUBMITTED\"","children":[{"start":8,"value":"SUBMITTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":69,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに \"申請中\" というステータスラベルが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"\"申請中\"","children":[{"start":9,"value":"申請中","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":72,"pickleLine":73,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given ステータスが \"APPROVED\" の発注書が存在する","stepMatchArguments":[{"group":{"start":7,"value":"\"APPROVED\"","children":[{"start":8,"value":"APPROVED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに \"承認済み\" というステータスラベルが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"\"承認済み\"","children":[{"start":9,"value":"承認済み","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":77,"pickleLine":74,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given ステータスが \"ORDERED\" の発注書が存在する","stepMatchArguments":[{"group":{"start":7,"value":"\"ORDERED\"","children":[{"start":8,"value":"ORDERED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":79,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに \"発注済み\" というステータスラベルが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"\"発注済み\"","children":[{"start":9,"value":"発注済み","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":82,"pickleLine":75,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given ステータスが \"REJECTED\" の発注書が存在する","stepMatchArguments":[{"group":{"start":7,"value":"\"REJECTED\"","children":[{"start":8,"value":"REJECTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに \"却下\" というステータスラベルが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"\"却下\"","children":[{"start":9,"value":"却下","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":87,"pickleLine":76,"tags":["@F-02-01-001","@F-02-01-007","@F-02-01-008","@UC-007","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given ステータスが \"CANCELLED\" の発注書が存在する","stepMatchArguments":[{"group":{"start":7,"value":"\"CANCELLED\"","children":[{"start":8,"value":"CANCELLED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 発注テーブルに \"キャンセル\" というステータスラベルが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"\"キャンセル\"","children":[{"start":9,"value":"キャンセル","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end