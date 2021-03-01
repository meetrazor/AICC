import { Component, OnInit } from '@angular/core';

import { SweetAlert } from './sweetalert.model';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-sweetalert',
    templateUrl: './sweetalert.component.html',
    styleUrls: ['./sweetalert.component.scss']
})

/**
 * Sweet-alert component - handling the Sweet-alert with sidebar and content
 */
export class SweetalertComponent implements OnInit {

    // bread crum items
    breadCrumbItems: Array<{}>;

    // Sweet-alert
    sweetAlert: SweetAlert[];

    constructor() { }

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Admin UI', path: '/' }, { label: 'Sweet Alert', path: '/', active: true }];

        /**
         * Fetches data
         */
        this._fetchData();
    }

    /**
     * fetches the Sweetalert data
     */
    private _fetchData() {
        this.sweetAlert = [
            {
                title: 'A basic message',
                method: () => {
                    Swal.fire({
                        title: 'Any fool can use a computer!',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    });
                }
            },
            {
                title: 'A title with a text under',
                method: () => {
                    Swal.fire({
                        title: 'The Internet?',
                        text: 'That thing is still around?',
                        type: 'question',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    });
                }
            },
            {
                title: 'A success message!',
                method: () => {
                    Swal.fire({
                        title: 'Good job!',
                        text: 'You clicked the button!',
                        type: 'success',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    });
                }
            },
            {
                title: 'A modal window with a long content inside:',
                method: () => {
                    Swal.fire({
                        imageUrl: 'https://placeholder.pics/svg/300x1500',
                        imageHeight: 1500,
                        imageAlt: 'A tall image',
                        confirmButtonClass: 'btn btn-confirm mt-2',
                    });
                }
            },
            {
                title: 'A custom positioned dialog',
                method: () => {
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            },
            {
                title: 'A modal with a title, an error icon, a text, and a footer',
                method: () => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        confirmButtonClass: 'btn btn-confirm mt-2',
                        footer: '<a>Why do I have this issue?</a>'
                    });
                }
            },
            {
                title: 'A confirm dialog, with a function attached to the \'Confirm\'-button...',
                method: () => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'You won\'t be able to revert this!',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                        }
                    });
                }
            },
            {
                title: 'By passing a parameter, you can execute something else for Cancel',
                method: () => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'You won\'t be able to revert this!',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel!',
                        confirmButtonClass: 'btn btn-success mt-2',
                        cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                        buttonsStyling: false
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                type: 'success'
                            });
                        } else if (
                            // Read more about handling dismissals
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            Swal.fire({
                                title: 'Cancelled',
                                text: 'Your imaginary file is safe :)',
                                type: 'error'
                            });
                        }
                    });
                }
            },
            {
                title: 'A message with custom Image Header',
                method: () => {
                    Swal.fire({
                        title: 'UBold',
                        text: 'Responsive Bootstrap 4 Admin Dashboard',
                        imageUrl: 'assets/images/logo-sm.png',
                        imageHeight: 50,
                        animation: false,
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    });
                }
            },
            {
                title: 'A message with auto close timer',
                method: () => {
                    let timerInterval;
                    Swal.fire({
                        title: 'Auto close alert!',
                        html: 'I will close in <strong></strong> seconds.',
                        timer: 2000,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                            timerInterval = setInterval(() => {
                                Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft() + '';
                            }, 100);
                        },
                        onClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        if (
                            result.dismiss === Swal.DismissReason.timer
                        ) {
                            console.log('I was closed by the timer');
                        }
                    });
                }
            },
            {
                title: 'Custom HTML description and buttons',
                method: () => {
                    Swal.fire({
                        title: '<strong>HTML <u>example</u></strong>',
                        type: 'info',
                        html:
                            'You can use <b>bold text</b>, ' +
                            '<a href="//github.com">links</a> ' +
                            'and other HTML tags',
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Great!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i>',
                        cancelButtonAriaLabel: 'Thumbs down'
                    });
                }
            },
            {
                title: 'A message with custom width, padding and background',
                method: () => {
                    Swal.fire({
                        title: 'Custom width, padding, background.',
                        width: 600,
                        padding: 100,
                        confirmButtonClass: 'btn btn-confirm mt-2',
                        background: '#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)'
                    });
                }
            },
            {
                title: 'Ajax request example',
                method: () => {
                    Swal.fire({
                        title: 'Submit your Github username',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Look up',
                        showLoaderOnConfirm: true,
                        preConfirm: (login) => {
                            return fetch(`//api.github.com/users/${login}`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage(
                                        `Request failed: ${error}`
                                    );
                                });
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire({
                                title: `${result.value.login}'s avatar`,
                                imageUrl: result.value.avatar_url
                            });
                        }
                    });
                }
            },
            {
                title: 'Chaining modals (queue) example',
                method: () => {
                    Swal.mixin({
                        input: 'text',
                        confirmButtonText: 'Next &rarr;',
                        showCancelButton: true,
                        progressSteps: ['1', '2', '3']
                    }).queue([
                        {
                            title: 'Question 1',
                            text: 'Chaining swal2 modals is easy'
                        },
                        'Question 2',
                        'Question 3'
                    ]).then((result) => {
                        if (result.value) {
                            Swal.fire({
                                title: 'All done!',
                                html:
                                    'Your answers: <pre><code>' +
                                    JSON.stringify(result.value) +
                                    '</code></pre>',
                                confirmButtonText: 'Lovely!'
                            });
                        }
                    });
                }
            },
            {
                title: 'Dynamic queue example',
                method: () => {
                    const ipAPI = 'https://api.ipify.org?format=json';
                    Swal.queue([{
                        title: 'Your public IP',
                        confirmButtonText: 'Show my public IP',
                        text:
                            'Your public IP will be received ' +
                            'via AJAX request',
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            return fetch(ipAPI)
                                .then(response => response.json())
                                .then(data => Swal.insertQueueStep(data.ip))
                                .catch(() => {
                                    Swal.insertQueueStep({
                                        type: 'error',
                                        title: 'Unable to get your public IP'
                                    });
                                });
                        }
                    }]);
                }
            },
        ];
    }
}
