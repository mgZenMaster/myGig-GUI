var mgAutocomplete = (function() {

  return {

    get_text_id: function(optionslist_id, inputfield_id, id_field_id) {

      try {
        const answer_id = document.querySelector("#" + optionslist_id + " option[value='" + document.getElementById(inputfield_id).value.trim() + "']").attributes["data-value"].value;
        document.getElementById(id_field_id).value = answer_id;
        return answer_id;
      } catch(ex) {
        document.getElementById(id_field_id).value = '';
        return null;
      }
    },

    update_optionslist: function(input) {
      var value = input.value.trim();
      if (value.length > 2) {
        $.ajax({
            dataType: "json",
            type: "GET",
            async: true,
            url: input.attributes["ajax-url"].value,
            data: {q: value},
            input_field: input,
            success: function(answers) {
                while (this.input_field.list.firstChild) {
                    this.input_field.list.removeChild(this.input_field.list.lastChild);
                  }
                const text = this.input_field.value.trim();
                for (var key in answers) {
                    existing_answer_text = answers[key].text.trim();
                    $('<option value="' + existing_answer_text + '" data-value="' + answers[key].value + '"/>').html(existing_answer_text).appendTo(this.input_field.list);
                    if (answers[key].text.trim() == text) {
                      input_field.ajax_id_input.value = answers[key].value;
                    }
                }

            }
        });
      } else {
        while (input.list.firstChild) {
                    input.list.removeChild(input.list.lastChild);
        };
      }
    },
    decorate: function(input) {
      const input_id = input.id;
      const optionslist = input.list;

      f = document.createDocumentFragment();
      if (!("list" in input.attributes)) {
        datalist = f.appendChild(document.createElement('datalist'));
        datalist.id = input.id + "_ajax_datalist";
        input.setAttribute("list", datalist.id);
      } else if (input.list == null) {
        datalist = f.appendChild(document.createElement('datalist'));
        datalist.id = input.attributes['list'].value;
      }
      if (!("ajax-url" in input.attributes)) {
        if (input.name) {
          input.setAttribute("ajax-url", "/ajax/" + input.name)
        } else {
          throw "You have to specify a name or an ajax-url for the autocomplete field";
        }
      }
      hidden_input = f.appendChild(document.createElement('input'));
      hidden_input.id = input.id + "_ajax_id";
      hidden_input.setAttribute('type', 'hidden');
      hidden_input.setAttribute('name', input.name + "_ajax_id");
      id_input = input.parentElement.appendChild(f);
      input.ajax_id_input = hidden_input;
      input.oninput = function(event) {
        input = event.currentTarget;
        mgAutocomplete.get_text_id(input.list.id, input.id, input.ajax_id_input.id);
      }
      input.onkeydown = function(event) {
          if(event.which == 13) event.preventDefault();
        };
      input.onkeyup = function(event) {
          mgAutocomplete.update_optionslist(event.currentTarget);
        };
    }

  }


})();
