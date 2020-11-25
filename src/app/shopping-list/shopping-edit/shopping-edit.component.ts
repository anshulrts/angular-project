import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService) { }
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  
  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = false;
          this.editedItemIndex = index;
        }
    )
  }

  ngOnDestroy() {

  }

  onAddClick(form: NgForm) {
    const value = form.value;
    const newingredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newingredient);
  }
}
