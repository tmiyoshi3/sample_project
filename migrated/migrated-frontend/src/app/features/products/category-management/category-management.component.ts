import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CategoryResponse } from '../models/product.model';

interface CategoryTreeNode {
  category: CategoryResponse;
  children: CategoryTreeNode[];
  expanded: boolean;
  level: number;
}

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  categories: CategoryResponse[] = [];
  categoryTree: CategoryTreeNode[] = [];
  flattenedTree: CategoryTreeNode[] = [];
  isLoading = true;
  categoryForm!: FormGroup;
  editMode: 'create' | 'edit' | null = null;
  editingCategoryId: number | null = null;
  parentOptions: { id: number | null; name: string; level: number }[] = [];
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  showDeleteConfirm = false;
  deletingCategory: CategoryResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  private initializeForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      parentId: [null],
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.buildTree();
        this.buildParentOptions();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'カテゴリの取得に失敗しました。';
        this.isLoading = false;
      },
    });
  }

  private buildTree(): void {
    const nodeMap = new Map<number, CategoryTreeNode>();

    this.categories.forEach((cat) => {
      nodeMap.set(cat.id, {
        category: cat,
        children: [],
        expanded: true,
        level: 0,
      });
    });

    this.categoryTree = [];
    this.categories.forEach((cat) => {
      const node = nodeMap.get(cat.id)!;
      if (cat.parentId && nodeMap.has(cat.parentId)) {
        const parentNode = nodeMap.get(cat.parentId)!;
        parentNode.children.push(node);
        node.level = parentNode.level + 1;
      } else {
        this.categoryTree.push(node);
      }
    });

    this.setLevels(this.categoryTree, 0);
    this.flattenTree();
  }

  private setLevels(nodes: CategoryTreeNode[], level: number): void {
    nodes.forEach((node) => {
      node.level = level;
      if (node.children.length > 0) {
        this.setLevels(node.children, level + 1);
      }
    });
  }

  private flattenTree(): void {
    this.flattenedTree = [];
    this.flattenNodes(this.categoryTree);
  }

  private flattenNodes(nodes: CategoryTreeNode[]): void {
    nodes.forEach((node) => {
      this.flattenedTree.push(node);
      if (node.expanded && node.children.length > 0) {
        this.flattenNodes(node.children);
      }
    });
  }

  private buildParentOptions(): void {
    this.parentOptions = [{ id: null, name: '（ルートカテゴリ）', level: 0 }];
    this.addParentOption(this.categoryTree);
  }

  private addParentOption(nodes: CategoryTreeNode[]): void {
    nodes.forEach((node) => {
      this.parentOptions.push({
        id: node.category.id,
        name: '\u3000'.repeat(node.level) + node.category.name,
        level: node.level,
      });
      if (node.children.length > 0) {
        this.addParentOption(node.children);
      }
    });
  }

  toggleExpand(node: CategoryTreeNode): void {
    node.expanded = !node.expanded;
    this.flattenTree();
  }

  startCreate(parentId: number | null = null): void {
    this.editMode = 'create';
    this.editingCategoryId = null;
    this.categoryForm.reset({
      name: '',
      description: '',
      parentId: parentId,
    });
    this.errorMessage = '';
    this.successMessage = '';
  }

  startEdit(category: CategoryResponse): void {
    this.editMode = 'edit';
    this.editingCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      parentId: category.parentId,
    });
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.editMode = null;
    this.editingCategoryId = null;
    this.categoryForm.reset();
  }

  saveCategory(): void {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = this.categoryForm.value;

    if (this.editMode === 'create') {
      this.productService
        .createCategory({
          name: formData.name,
          description: formData.description || '',
          parentId: formData.parentId,
        })
        .subscribe({
          next: () => {
            this.successMessage = 'カテゴリを作成しました。';
            this.isSubmitting = false;
            this.cancelEdit();
            this.loadCategories();
          },
          error: () => {
            this.errorMessage = 'カテゴリの作成に失敗しました。';
            this.isSubmitting = false;
          },
        });
    } else if (this.editMode === 'edit' && this.editingCategoryId) {
      this.productService
        .updateCategory(this.editingCategoryId, {
          name: formData.name,
          description: formData.description || '',
          parentId: formData.parentId,
        })
        .subscribe({
          next: () => {
            this.successMessage = 'カテゴリを更新しました。';
            this.isSubmitting = false;
            this.cancelEdit();
            this.loadCategories();
          },
          error: () => {
            this.errorMessage = 'カテゴリの更新に失敗しました。';
            this.isSubmitting = false;
          },
        });
    }
  }

  confirmDelete(category: CategoryResponse): void {
    this.deletingCategory = category;
    this.showDeleteConfirm = true;
  }

  deleteCategory(): void {
    if (!this.deletingCategory) return;

    const id = this.deletingCategory.id;
    this.productService.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'カテゴリを削除しました。';
        this.showDeleteConfirm = false;
        this.deletingCategory = null;
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'カテゴリの削除に失敗しました。';
        this.showDeleteConfirm = false;
        this.deletingCategory = null;
      },
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deletingCategory = null;
  }

  moveUp(node: CategoryTreeNode): void {
    const siblings = this.getSiblings(node);
    const index = siblings.findIndex((n) => n.category.id === node.category.id);
    if (index > 0) {
      const temp = siblings[index];
      siblings[index] = siblings[index - 1];
      siblings[index - 1] = temp;
      this.flattenTree();
    }
  }

  moveDown(node: CategoryTreeNode): void {
    const siblings = this.getSiblings(node);
    const index = siblings.findIndex((n) => n.category.id === node.category.id);
    if (index < siblings.length - 1) {
      const temp = siblings[index];
      siblings[index] = siblings[index + 1];
      siblings[index + 1] = temp;
      this.flattenTree();
    }
  }

  private getSiblings(node: CategoryTreeNode): CategoryTreeNode[] {
    if (node.category.parentId === null || node.category.parentId === undefined) {
      return this.categoryTree;
    }
    const parent = this.findParentNode(this.categoryTree, node.category.id);
    return parent ? parent.children : this.categoryTree;
  }

  private findParentNode(nodes: CategoryTreeNode[], childId: number): CategoryTreeNode | null {
    for (const n of nodes) {
      if (n.children.some((c) => c.category.id === childId)) {
        return n;
      }
      const found = this.findParentNode(n.children, childId);
      if (found) return found;
    }
    return null;
  }

  getIndentStyle(level: number): object {
    return { 'padding-left': level * 28 + 16 + 'px' };
  }
}
