import { CurrentSupplierDetailPageAdapter } from '../../current/F-04/supplier-detail.adapter.js';

export class MigratedSupplierDetailPageAdapter extends CurrentSupplierDetailPageAdapter {
  // migrated環境ではベースURL以外はcurrentと同一セレクタを想定
  // 差分が判明した場合にメソッドをオーバーライドする
}
