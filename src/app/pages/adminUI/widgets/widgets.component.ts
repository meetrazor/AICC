import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChartType } from './widgets.model';

import {
  widget, widgetInline, widgetTooltip, widgetProgress, widgetuser, inboxData, chatData, todoData,
  salesStatusChart, recentuserAreaChart, incomeBarChart, lifetimeAreaChart, amountsBarChart, revenuePieChart,
  revenueRadialChart, salesRadialChart, usersRadialChart
} from './data';
import { Widgets, WidgetInline, WidgetTooltip, WidgetProgress, WidgetUser, Inbox, Chat, Todo } from './widgets.model';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})

/**
 * Widgets component - handling the widgets with sidebar and content
 */
export class WidgetsComponent implements OnInit {
  // bread crumb data
  breadCrumbItems: Array<{}>;

  widget: Widgets[];
  widgetInline: WidgetInline[];
  widgetTooltip: WidgetTooltip[];
  widgetProgress: WidgetProgress[];
  widgetuser: WidgetUser[];
  inboxData: Inbox[];
  chatData: Chat[];
  todoData: Todo[];
  salesStatusChart: ChartType;
  recentuserAreaChart: ChartType;
  incomeBarChart: ChartType;
  revenueRadialChart: ChartType;
  salesRadialChart: ChartType;
  usersRadialChart: ChartType;
  lifetimeAreaChart: ChartType;
  amountsBarChart: ChartType;
  revenuePieChart: ChartType;
  // Validation form
  formData: FormGroup;
  formTodoData: FormGroup;

  // Form submit
  chatSubmit: boolean;
  todoSubmit: boolean;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Admin UI', path: '/' }, { label: 'Widgets', path: '/', active: true }];
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
   * fetches the widgets value
   */
  private _fetchData() {
    this.widget = widget;
    this.widgetInline = widgetInline;
    this.widgetTooltip = widgetTooltip;
    this.widgetProgress = widgetProgress;
    this.widgetuser = widgetuser;
    this.inboxData = inboxData;
    this.chatData = chatData;
    this.todoData = todoData;
    this.salesStatusChart = salesStatusChart;
    this.recentuserAreaChart = recentuserAreaChart;
    this.incomeBarChart = incomeBarChart;
    this.revenueRadialChart = revenueRadialChart;
    this.salesRadialChart = salesRadialChart;
    this.usersRadialChart = usersRadialChart;
    this.lifetimeAreaChart = lifetimeAreaChart;
    this.amountsBarChart = amountsBarChart;
    this.revenuePieChart = revenuePieChart;
  }
}
