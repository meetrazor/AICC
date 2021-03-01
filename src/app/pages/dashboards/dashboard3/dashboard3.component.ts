import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { widget, revenueAreaChart, projectionBarChart, inboxData, chatData, todoData } from './data';

import { Widget, Inbox, Chat, Todo, ChartType } from './dashboar3.model';

@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss']
})

/**
 * Dashboard-3 component: handling the dashboard-3 with sidebar and content
 */
export class Dashboard3Component implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueAreaChart: ChartType;
  projectionBarChart: ChartType;

  inboxData: Inbox[];
  chatData: Chat[];
  todoData: Todo[];
  widget: Widget[];
  // Validation form
  formData: FormGroup;
  formTodoData: FormGroup;

  // Form submit
  chatSubmit: boolean;
  todoSubmit: boolean;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Dashboard 3', path: '/', active: true }];

    /**
     * Input Chat Validation
     */
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    /**
     * Todo Input Validation
     */
    this.formTodoData = this.formBuilder.group({
      text: ['', [Validators.required]],
    });

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    if (this.formData.valid) {
      const message = this.formData.get('message').value;
      const currentDate = new Date();

      // Message Push in Chat
      this.chatData.push({
        name: 'Geneva',
        image: 'assets/images/users/user-1.jpg',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: ''
      });
    }

    this.chatSubmit = true;
  }

  /**
   * Returns form
   */
  get form1() {
    return this.formTodoData.controls;
  }

  /**
   * Save the todo data in Todo
   */
  saveTodo() {
    const id = this.todoData.filter(i => i.id).map(i => i.id);
    if (this.formTodoData.valid) {
      const text = this.formTodoData.get('text').value;
      this.todoData.push({
        id: id.length + 1,
        text,
        done: false
      });

      // Set Form Data Reset
      this.formTodoData = this.formBuilder.group({
        text: ''
      });
    }

    this.todoSubmit = true;
  }
  /**
   * Returns the completed todos
   */
  get completedTodo() {
    return this.todoData.filter(t => t.done === false);
  }
  /**
   * Set Checkbox Status
   * @param index checkbox index
   */
  changeStatus(index) {
    this.todoData[index].done = !this.todoData[index].done;
  }

  /**
   * checked todo data hide
   */
  archiveTodo() {
    this.todoData = this.todoData.filter(x => x.done === false);
  }

  /**
   * fetches the dashboard-3 values
   */
  private _fetchData() {
    this.revenueAreaChart = revenueAreaChart;

    this.projectionBarChart = projectionBarChart;

    this.inboxData = inboxData;
    this.chatData = chatData;
    this.todoData = todoData;
    this.widget = widget;
  }
}
