// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var incognito;
var url;
document.addEventListener( 'DOMContentLoaded', function () {
    document.getElementById( 'privacy-advice' ).innerHTML = 'This extension scrap text from a website' +
        ',checks its authenticity and gives a result("Fake" or "real") based on the analysis' +
        'This extension does not collect any personal identifiable information (PII) in any way. ' +
        'Please feel free to disable this extension in any point of time if you do not agree with the terms mentioned above.';
    console.log("chrome");
} );
