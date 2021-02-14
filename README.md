# myGig-GUI

I tried to program a simple and lightweight ajax autocomplete field, that can also accept new values.

The only requirement now, is jQuery. I'm sure it can work without jQuery as well, but have not gotten round to checking that out.

mgAutocomplete uses an existing HTML input field. It can create or use an existing datalist. It also creates a hidden input-field for storing the id. The options get filled by an AJAX call. And the id gets set whenever the text in the input field is the same as an existing text in the AJAX response. Leading and trailing whitespaces are trimmed. This means you can not enter the same as an existing text without the id being set.

The simplest way, is to use it like this:

```
<INPUT id="my_input" name="my_text">

<SCRIPT TYPE='text/javascript'>
mgAutocomplete.when_ready(
  function() {
    mgAutocomplete.decorate(document.getElementById("my_input"));
  }
);
</script>
```
It will setup a datalist with the id `my_input_ajax_datalist` and a hidden input with id `my_input_ajax_id` and name `my_text_ajax_id`. It will query the ajax endpoint `/ajax/my_text?q=searchtext`.

As you see in this example, you can use the `when_ready()` function to decorate the inputs without using jQuery. This works in more recent browsers - if you want to be safe use jQuery:
```
$(document).ready(function() {
    mgAutocomplete.decorate(document.getElementById("my_input"));
  }
);
```

The response that is expected is a JSON dictionary where key is the primary key of your existing entry and value is the existing text from your database, like this:
```
{
  1: 'My first text',
  2: 'My second text'
}
```
The value part does not have to be an integer, it could be a string, like a UUID:
```
{
  '493ce0bb-b939-48f7-b6a1-0089b5731b2f': 'My first text',
  '25225d11-aea6-4aa9-9dd4-3416eb461a1b': 'My second text'
}
```

If you have a datalist the widget can use, specify it in the input as you normally would. This way you could use the same datalist for all your fields.

```
<INPUT id="my_input" name="my_name" list="my_list">
```

You can also set your own AJAX URL in the attributes of the input field:
```
<INPUT id="my_input" name="my_name" list="my_list" ajax-url="/my_name/search">
```
