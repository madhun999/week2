    var bookList = [];              // The list of books is maintained here
    var newRecord = true;

    // Default to show the table and hide the editing form
    showBookList();

    // Display the editing form
    function addRecord() {
      newRecord = true;
      $('#bookISBN').removeAttr('readonly');
      showEditingForm();
    }

    // Submit the new record
    function commitRecord() {
      var bookIsbn = $('#bookISBN').val();
      var bookTitle = $('#bookTitle').val();
      var bookAuthor = $('#bookAuthor').val();

      // Do some validation
      var regex = /^\d{10}$/;
      if (bookIsbn == '' || !regex.test(bookIsbn) || bookTitle == '' || bookAuthor == '') {
        alert('You must enter a valid ISBN and a Title and an Author!');
        return;
      }
      if (newRecord && findRecord(bookIsbn) != -1) {
        alert('The ISBN must be unique!');
        return;
      }

      if (newRecord) {
        // Insert the new book and display it
        bookList.push({ isbn: bookIsbn, title: bookTitle, author: bookAuthor });
      } else {
        // Else edit existing record
        var x = findRecord(bookIsbn);
        if (x != -1) {
          bookList[x].title = bookTitle;
          bookList[x].author = bookAuthor;
        }
      }

      refreshBookList();
      showBookList();
    }

    function deleteRecord(isbn) {
      var x = findRecord(isbn);
      if (x != -1) {
        bookList.splice(x, 1);
        refreshBookList();
      }
    }

    function editRecord(isbn) {
      var x = findRecord(isbn);
      if (x != -1) {
        $('#bookISBN').val(bookList[x].isbn)
        $('#bookTitle').val(bookList[x].title)
        $('#bookAuthor').val(bookList[x].author)
        newRecord = false;
        $('#bookISBN').attr('readonly', 'true');
        showEditingForm();
      }
    }

    function findRecord(isbn) {
      for (x in bookList) {
        if (bookList[x].isbn == isbn)
          return x;
      }
      return -1;
    }

    function refreshBookList() {
      $('#bookListBody').empty();
      var html = "";
      for (x in bookList) {
        html += "<tr>" +
          "<td>" + bookList[x].isbn + "</td>" +
          "<td>" + bookList[x].title + "</td>" +
          "<td>" + bookList[x].author + "</td>" +
          "<td><button onclick=\"editRecord(\'" + bookList[x].isbn + "\');\">Edit</button>&nbsp;<button onclick=\"deleteRecord(\'" + bookList[x].isbn + "\');\">Delete</button></td>" +
          "</tr>"
      }
      $('#bookListBody').html(html);
    }

    function cancelRecord() {
      showBookList();
    }

    function showBookList() {
      $('#bookList').show();
      $('#bookEditForm').hide();
    }
    function showEditingForm() {
      $('#bookList').hide();
      $('#bookEditForm').show();
    }

