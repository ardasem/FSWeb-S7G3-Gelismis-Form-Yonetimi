/// <reference types="cypress" />

describe("Member Form Test", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
    });
  
    it("sayfa hatasız yükleniyor", () => {
      cy.get("h1").should("have.text", "Üye Kayıt Formu");
    });
  
    it("4 form alanı ve bir buton görünüyor", () => {
      cy.get("input").should("have.length", 4);
      cy.get("button").should("have.length", 1);
    });
  
    // 
    
    const correct = {
        name:'Arda',
        email:'dobby@gmail.com',
        password: 'Aa123456!'
    }

    const inCorrect = {
        name:'da',
        email:'dobbygmail.com',
        password: 'Aa16!'
    }

    it('isim alanina dogru degerler girilince calismasi gerekiyor', ()=>{
        cy.get("input[name=name]").type(correct.name).should('have.value',correct.name)
        cy.get("input[name=email]").type(correct.email).should('have.value',correct.email)
        cy.get("input[name=password]").type(correct.password).should('have.value',correct.password)
        

    })

    it('sifre kismina yanlis deger girildigindeki testler',()=>{
        cy.get("input[name=password]").type(inCorrect.password);

        cy.get("[data-test='error']").should('have.length',1);
        cy.get("[data-test='error']").should('have.text',"Must contain 1 symbol 1 uppercase letter 1 lowercase letter min 8 characters long.")

       
    })
  

    
  });