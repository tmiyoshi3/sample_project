'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './products.module.css';

interface Category { id: number; name: string; }
interface Manufacturer { id: number; name: string; }

interface ProductFormData {
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  manufacturerId: string;
  unitPrice: string;
  status: string;
  minimumOrderQuantity: string;
  leadTimeDays: string;
  notes: string;
}

interface Props {
  categories: Category[];
  manufacturers: Manufacturer[];
  initialData?: ProductFormData & { id?: number };
  isEdit?: boolean;
}

export default function ProductForm({ categories, manufacturers, initialData, isEdit }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(initialData || {
    sku: '', name: '', description: '', categoryId: '', manufacturerId: '',
    unitPrice: '', status: 'ACTIVE', minimumOrderQuantity: '', leadTimeDays: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim()) {
      setError('製品名とSKUは必須です');
      return;
    }
    setSubmitting(true);
    setError('');

    const body = {
      sku: form.sku,
      name: form.name,
      description: form.description || null,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      manufacturerId: form.manufacturerId ? Number(form.manufacturerId) : null,
      unitPrice: form.unitPrice ? Number(form.unitPrice) : null,
      status: form.status,
      minimumOrderQuantity: form.minimumOrderQuantity ? Number(form.minimumOrderQuantity) : null,
      leadTimeDays: form.leadTimeDays ? Number(form.leadTimeDays) : null,
      notes: form.notes || null,
    };

    const url = isEdit ? `/api/products/${initialData?.id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(isEdit ? `/products/${initialData?.id}` : `/products/${data.id}`);
    } else {
      setError('保存に失敗しました');
      setSubmitting(false);
    }
  };

  return (
    <div>
      <span className={styles.backLink} onClick={() => router.back()}>
        ← 戻る
      </span>
      <h1 className={styles.pageTitle}>{isEdit ? '製品編集' : '製品登録'}</h1>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {error && <div className={styles.formError} style={{ marginBottom: 16 }}>{error}</div>}

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>SKU *</label>
            <input className={styles.formInput} name="sku" value={form.sku}
                   onChange={handleChange} placeholder="例: NPC-001001" required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>ステータス</label>
            <select className={styles.formSelect} name="status" value={form.status} onChange={handleChange}>
              <option value="ACTIVE">有効</option>
              <option value="INACTIVE">無効</option>
              <option value="DISCONTINUED">廃止</option>
            </select>
          </div>

          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label className={styles.formLabel}>製品名 *</label>
            <input className={styles.formInput} name="name" value={form.name}
                   onChange={handleChange} placeholder="製品名を入力" required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>カテゴリ</label>
            <select className={styles.formSelect} name="categoryId" value={form.categoryId} onChange={handleChange}>
              <option value="">選択してください</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>メーカー</label>
            <select className={styles.formSelect} name="manufacturerId" value={form.manufacturerId} onChange={handleChange}>
              <option value="">選択してください</option>
              {manufacturers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>単価</label>
            <input className={styles.formInput} name="unitPrice" type="number" step="0.01"
                   value={form.unitPrice} onChange={handleChange} placeholder="0" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>最小発注数量</label>
            <input className={styles.formInput} name="minimumOrderQuantity" type="number"
                   value={form.minimumOrderQuantity} onChange={handleChange} placeholder="1" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>リードタイム（日）</label>
            <input className={styles.formInput} name="leadTimeDays" type="number"
                   value={form.leadTimeDays} onChange={handleChange} placeholder="0" />
          </div>

          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label className={styles.formLabel}>説明</label>
            <textarea className={styles.formTextarea} name="description"
                      value={form.description} onChange={handleChange} placeholder="製品の説明を入力" />
          </div>

          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label className={styles.formLabel}>備考</label>
            <textarea className={styles.formTextarea} name="notes"
                      value={form.notes} onChange={handleChange} placeholder="備考を入力" />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={() => router.back()}>
            キャンセル
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={submitting}>
            {submitting ? '保存中...' : isEdit ? '更新' : '登録'}
          </button>
        </div>
      </form>
    </div>
  );
}
