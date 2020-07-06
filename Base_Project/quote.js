$(document).ready(function () {
    var apt, basement, floors, park, cage, biz, occ, tenant, hourly;
    var costPerUnit, installFee, subTotal, serviceType, numCol, numShaft;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

      $('#numApt').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            apt = '';
        } else {
        apt = $(this).val();
        }})
        $('#numBase').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            basement = '';
        } else {
        basement = $(this).val();
        }})
        $('#numFloors').keyup(function () {
            if ($(this).val() < 0 || $(this).val() === NaN) {
                alert("Please enter a number 0 or greater!");
                floors = '';
            } else {
            floors = $(this).val();
            }})
    $('#numPark').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            park = '';
        } else {
        park = $(this).val();
        }})
    $('#numCage').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            cage = '';
        } else {
        cage = $(this).val();
        }})
    $('#numOcc').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            occ = '';
        } else {
        occ = $(this).val();
        }})
    $('#numTenant').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            tenant = '';
        } else {
        tenant = $(this).val();
        }})
    $('#numBiz').keyup(function () {
        if ($(this).val() < 0 || $(this).val() === NaN) {
            alert("Please enter a number 0 or greater!");
            biz = '';
        } else {
        biz = $(this).val();
        }})
    $('#numHourly').keyup(function () {
        if ($(this).val() <= 0 || $(this).val() > 24  || $(this).val() === NaN) {
            alert("Please enter a between 1 and 24!");
            hourly = '';
        } else {
        hourly = $(this).val();
        }})


    $('[name="serviceType"]').on('click change',function () {
        serviceType = $(this).val();
        if (serviceType == "standard") {
            costPerUnit = 7565;
            installFee = 0.10;
        } else if (serviceType == "premium") {
            costPerUnit = 12345;
            installFee = 0.13;
        } else if(serviceType == "excelium"){
            costPerUnit = 15400;
            installFee = 0.16;
        } else {
            serviceType = 'Select a Service Type'
            costPerUnit = null;
            installFee = null;
        }
    });

    function calcBase() {
        if ($("#resSelect").hasClass("active") && apt > 0 && floors > 0 && basement >= 0){
            let dPF = Math.ceil(apt / floors);
            numShaft = Math.ceil(dPF/6);
            numCol = Math.ceil(floors/20);
            totalEl = numShaft * numCol;
            subTotal = numShaft * numCol;
            calcGrand();
        } else if ($("#comSelect").hasClass("active") && cage >= 0 && floors > 0 && basement >= 0 && biz >= 0 && park >= 0) {
            numShafts = cage;
            totalEl = cage;
            subTotal = cage;
            calcGrand();
        } else if ($("#corpSelect").hasClass("active") || ($("#hybSelect").hasClass("active")) && floors > 0 && basement >= 0 && park >= 0 && tenant >= 0 && occ > 0) {
            let totalFloors = parseFloat(floors) + parseFloat(basement);
            let totalOcc = occ * totalFloors;
            let totalCage = Math.ceil(totalOcc/1000);
            numCol = Math.ceil(floors/20);
            numShaft = Math.ceil(totalCage/numCol);
            totalEl = totalCage;
            subTotal = totalCage;
            calcGrand();
        } else {
            installFee = null;
            costPerUnit = null;
            subTotal = 0;
            installCost = 0;
            grandTotal = 0;
           
        }
    }

    function calcGrand() {
        subTotal = totalEl * costPerUnit;
        installCost = subTotal * installFee;
        grandTotal = subTotal + installCost;
    }

    $('#resSelect, #comSelect, #corpSelect, #hybSelect').on('click change',function(){
        $('.myForm').val('');
        wipeValues();
        $(':input[name="subtotal"]').val("Please finish filling out the form");
        $(':input[name="totalElevators"]').val("Please finish filling out the form");
        $(':input[name="installation"]').val("Please finish filling out the form");
        $(':input[name="grandtotal"]').val("Please finish filling out the form");
        $(':input[name="typeOfService"]').val(serviceType);
    })

    function wipeValues() {
        $("input[type='radio'][name='serviceType']").prop('checked', false);
        apt = 0;
        basement = 0;
        floors = 0;
        park = 0;
        cage = 0;
        biz = 0; 
        occ = 0; 
        tenant = 0;
        hourly = 0;
        subTotal = 0;
        installCost = 0;
        grandTotal = 0;
        serviceType = '';
    }

    $(':input').on('click keyup change',function () {
        calcBase();
        if (grandTotal > 0) {
            $(':input[name="subtotal"]').val(formatter.format(subTotal));
            $(':input[name="totalElevators"]').val(totalEl);
            $(':input[name="installation"]').val(formatter.format(installCost));
            $(':input[name="grandtotal"]').val(formatter.format(grandTotal));
            $(':input[name="typeOfService"]').val(serviceType);
        } else {
            $(':input[name="subtotal"]').val("Please finish filling out the form");
            $(':input[name="totalElevators"]').val("Please finish filling out the form");
            $(':input[name="installation"]').val("Please finish filling out the form");
            $(':input[name="grandtotal"]').val("Please finish filling out the form");
            $(':input[name="typeOfService"]').val(serviceType);
        }
    })

});